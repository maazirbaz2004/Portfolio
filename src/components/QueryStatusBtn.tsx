"use client";

import React, { useTransition } from "react";
import { updateQueryStatus } from "@/app/actions/queries";
import { ContactStatus } from "@prisma/client";

export default function QueryStatusBtn({ id, currentStatus }: { id: string; currentStatus: ContactStatus }) {
  const [isPending, startTransition] = useTransition();

  const getStatusColor = (status: ContactStatus) => {
    switch (status) {
      case "Pending":
        return "text-purple-400 border-purple-500/30 bg-purple-950/20 hover:bg-purple-950/30";
      case "Done":
      case "Completed":
      case "Resolved":
        return "text-emerald-400 border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/30";
      default:
        return "text-slate-400 border-slate-700 bg-slate-900";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ContactStatus;
    startTransition(async () => {
      const res = await updateQueryStatus(id, newStatus);
      if (!res.success) {
        alert(res.error || "Failed to update query status.");
      }
    });
  };

  return (
    <div className="relative inline-block w-36">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={isPending}
        className={`w-full appearance-none rounded-xl border px-3 py-1.5 pr-8 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 transition-all cursor-pointer ${getStatusColor(
          currentStatus
        )}`}
      >
        <option value="Pending" className="bg-slate-950 text-purple-400">Pending</option>
        <option value="Done" className="bg-slate-950 text-emerald-400">Done</option>
        <option value="Completed" className="bg-slate-950 text-emerald-400">Completed</option>
        <option value="Resolved" className="bg-slate-950 text-emerald-400">Resolved</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
        {isPending ? (
          <svg className="animate-spin h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
    </div>
  );
}

