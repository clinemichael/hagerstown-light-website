"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

import {
  getScheduledJobs,
  type ScheduledJobRecord,
} from "@/data/scheduling/scheduledJobs";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function TodaysOperations() {
  const [jobs, setJobs] = useState<ScheduledJobRecord[] | null>(null);

  useEffect(() => {
    getScheduledJobs()
      .then((all) =>
        setJobs(all.filter((j) => j.scheduledDate === todayISO()))
      )
      .catch(() => setJobs([]));
  }, []);

  return (
    <section>
      <h2 className="text-xl font-bold text-brand-blue mb-4">
        Today&apos;s Operations
      </h2>

      <div className="bg-white rounded-lg border border-gray-200 divide-y">
        {jobs === null && (
          <p className="p-4 text-gray-400 text-sm">Loading today&apos;s jobs...</p>
        )}

        {jobs?.length === 0 && (
          <p className="p-4 text-gray-400 text-sm">
            No jobs scheduled for today.
          </p>
        )}

        {jobs?.map((job) => (
          <div key={job.id} className="flex items-center gap-4 p-4">
            <Calendar size={24} className="text-brand-blue" />

            <div className="flex-1">
              <h3 className="font-semibold">{job.jobName}</h3>
              <p className="text-sm text-gray-600">
                {job.crewName} · WO {job.workOrder}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              {job.startTime}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
