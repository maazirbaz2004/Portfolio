import prisma from "@/lib/db";
import { MessageSquare, Clock, CheckCircle2, ArrowUpRight, User, Mail } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0; // Disable caching so it fetches fresh stats on load

export default async function DashboardPage() {
  const [totalContacts, pendingContacts, resolvedContacts, recentContacts] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { status: "Pending" } }),
    prisma.contact.count({
      where: {
        status: { in: ["Done", "Completed", "Resolved"] }
      }
    }),
    prisma.contact.findMany({
      orderBy: { created_at: "desc" },
      take: 5
    })
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="purpleBadge">Pending</Badge>;
      case "Done":
      case "Completed":
      case "Resolved":
        return <Badge variant="greenBadge">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time statistics of inquiries submitted via the portfolio contact form.</p>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/40 border-slate-800/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wide">Total Queries</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{totalContacts}</div>
            <p className="text-xs text-slate-500 mt-1">All-time messages submitted</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wide">Pending Action</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{pendingContacts}</div>
            <p className="text-xs text-slate-500 mt-1">Awaiting response or resolution</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wide">Resolved Queries</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{resolvedContacts}</div>
            <p className="text-xs text-slate-500 mt-1">Marked as Done/Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions Section */}
      <Card className="bg-slate-900/40 border-slate-800/80 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-lg font-bold text-white">Recent Contacts</CardTitle>
            <CardDescription className="text-xs text-slate-500">The 5 most recent submissions received</CardDescription>
          </div>
          <Link
            href="/dashboard/queries"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All Queries
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentContacts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">
                      No contact submissions found in the database.
                    </td>
                  </tr>
                ) : (
                  recentContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4 space-y-0.5">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-slate-500" />
                          {contact.name}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-200 truncate max-w-[240px]">
                          {contact.subject || "No Subject"}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[280px]">
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(contact.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(contact.status)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
