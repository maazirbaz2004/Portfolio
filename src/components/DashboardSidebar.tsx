"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, LogOut, Shield } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

export default function DashboardSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-400 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
          <Shield className="h-4 w-4" />
        </div>
        <div className="text-left">
          <h2 className="font-bold text-white leading-tight">Admin Area</h2>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Logged in</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 text-left">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            pathname === "/dashboard"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
              : "hover:bg-slate-800 hover:text-white"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/dashboard/queries"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            pathname.startsWith("/dashboard/queries")
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
              : "hover:bg-slate-800 hover:text-white"
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Contact Queries
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-3 text-left">
        <div className="px-4 text-xs font-semibold text-slate-400 truncate">
          {adminName}
        </div>
        <form action={logoutUser}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-destructive/10 hover:text-destructive text-slate-400 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
