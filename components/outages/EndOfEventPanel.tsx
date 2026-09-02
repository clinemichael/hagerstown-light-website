"use client";

import { useState } from "react";

import Card from "@/components/common/Card";
import {
  clearStormCalls,
  setEventStart,
  type StormCall,
} from "@/data/outages";
import { INCIDENT_TYPES } from "@/lib/outageConstants";

async function buildEventReportPDF(
  calls: StormCall[],
  eventStart: string
) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Storm Outage Report", 14, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Event start: ${eventStart || "Not recorded"}`, 14, y);
  y += 6;
  doc.text(`Report generated: ${new Date().toLocaleString()}`, 14, y);
  y += 10;

  const totalReceived = calls.length;
  const totalComplete = calls.filter((c) => c.complete).length;
  const totalRemaining = totalReceived - totalComplete;

  const byType = INCIDENT_TYPES.map((t) => {
    const forType = calls.filter((c) => c.incident_type === t);
    const complete = forType.filter((c) => c.complete).length;
    return [t, forType.length, complete, forType.length - complete];
  });

  autoTable(doc, {
    startY: y,
    head: [["Metric", "Total", "Complete", "Remaining"]],
    body: [
      ["All Incidents", totalReceived, totalComplete, totalRemaining],
      ...byType,
    ],
    theme: "grid",
    styles: { fontSize: 9 },
  });

  // @ts-expect-error jspdf-autotable augments the doc instance at runtime
  y = doc.lastAutoTable.finalY + 12;

  const sorted = calls
    .slice()
    .sort(
      (a, b) =>
        new Date(a.received).getTime() -
        new Date(b.received).getTime()
    );

  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Full Call Log", 14, 20);

  autoTable(doc, {
    startY: 26,
    head: [
      [
        "#",
        "Received",
        "Type",
        "Address",
        "Feeder",
        "Status",
        "Crew",
        "Done",
      ],
    ],
    body: sorted.map((c) => [
      c.call_num,
      new Date(c.received).toLocaleString(),
      c.incident_type,
      [c.house_num, c.street, c.unit].filter(Boolean).join(" ") ||
        "—",
      c.feeder || "—",
      c.status,
      c.crew,
      c.complete ? "Yes" : "No",
    ]),
    theme: "striped",
    styles: { fontSize: 7.5 },
  });

  doc.save(`storm-report-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export default function EndOfEventPanel({
  calls,
  eventStart,
  onEventClosed,
}: {
  calls: StormCall[];
  eventStart: string;
  onEventClosed: () => void;
}) {
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("text-gray-500");
  const [start, setStart] = useState(eventStart);

  const handleStartChange = async (value: string) => {
    setStart(value);
    await setEventStart(value);
  };

  const handleEndEvent = async () => {
    if (
      !calls.length &&
      !confirm(
        "No calls are logged right now. Save an empty report and reset anyway?"
      )
    ) {
      return;
    }

    if (
      !confirm(
        `This will download a PDF report of ${calls.length} call(s), then permanently delete all of them from the board. This cannot be undone. Continue?`
      )
    ) {
      return;
    }

    if (
      !confirm(
        "Are you sure? This is your last chance to cancel before the board is cleared."
      )
    ) {
      return;
    }

    try {
      setStatusColor("text-gray-500");
      setStatus("Generating report...");
      await buildEventReportPDF(calls, start);

      setStatus("Clearing board...");
      await clearStormCalls();
      await setEventStart("");
      setStart("");

      setStatusColor("text-green-600");
      setStatus("Report saved and board reset.");
      onEventClosed();
    } catch (error) {
      setStatusColor("text-red-600");
      setStatus(
        `Something went wrong: ${
          error instanceof Error ? error.message : "unknown error"
        }`
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Event Details">
        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
          Event Start
        </label>
        <input
          type="text"
          placeholder="e.g. Apr 19, 2025 22:15"
          className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2"
          value={start}
          onChange={(e) => handleStartChange(e.target.value)}
        />
      </Card>

      <Card title="End of Event">
        <p className="text-sm text-gray-500 -mt-2 mb-4">
          Saves a PDF report of this storm&apos;s activity — summary
          stats and the full call log — then permanently clears the
          board so it&apos;s ready for the next event.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleEndEvent}
            className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Save Report &amp; Reset Board
          </button>

          {status && (
            <span className={`text-sm ${statusColor}`}>{status}</span>
          )}
        </div>
      </Card>
    </div>
  );
}
