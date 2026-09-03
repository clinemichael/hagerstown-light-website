"use client";

import { useEffect, useState } from "react";

import Card from "@/components/common/Card";
import { supabase } from "@/lib/supabase";
import {
  createAlert,
  deleteAlert,
  getAllAlerts,
  setAlertActive,
  type AlertPriority,
  type OperationsAlert,
} from "@/data/alerts";

const PRIORITY_STYLES: Record<AlertPriority, string> = {
  info: "bg-blue-100 text-blue-700",
  warning: "bg-yellow-100 text-yellow-700",
  critical: "bg-red-100 text-red-700",
};

export default function OperationsAlertsAdminPage() {
  const [alerts, setAlerts] = useState<OperationsAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<AlertPriority>("info");
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    try {
      setAlerts(await getAllAlerts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let createdBy: string | undefined;
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        createdBy = profile?.full_name;
      }

      await createAlert({
        title: title.trim(),
        description: description.trim(),
        priority,
        created_by: createdBy,
      });

      setTitle("");
      setDescription("");
      setPriority("info");
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (alert: OperationsAlert) => {
    await setAlertActive(alert.id, !alert.active);
    refresh();
  };

  const handleDelete = async (alert: OperationsAlert) => {
    if (!confirm(`Delete "${alert.title}"? This can't be undone.`)) return;
    await deleteAlert(alert.id);
    refresh();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Operations Alerts
      </h1>
      <p className="mt-2 text-gray-600">
        Alerts posted here appear at the top of everyone&apos;s dashboard
        while active.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="Post New Alert">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Description
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Priority
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={priority}
                onChange={(e) => setPriority(e.target.value as AlertPriority)}
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Posting..." : "Post Alert"}
            </button>
          </form>
        </Card>

        <Card title="Existing Alerts">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : alerts.length === 0 ? (
            <p className="text-gray-400 text-sm">No alerts yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {alerts.map((alert) => (
                <div key={alert.id} className="py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-brand-dark">
                        {alert.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {alert.description}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${PRIORITY_STYLES[alert.priority]}`}
                    >
                      {alert.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <button
                      onClick={() => toggleActive(alert)}
                      className="text-brand-blue font-semibold hover:underline"
                    >
                      {alert.active ? "Deactivate" : "Reactivate"}
                    </button>
                    <button
                      onClick={() => handleDelete(alert)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                    {!alert.active && (
                      <span className="text-gray-400">Inactive</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
