import prisma from "@/lib/db";
import { User, Mail, Phone, Calendar, MessageSquare, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import QueryStatusBtn from "@/components/QueryStatusBtn";

export const revalidate = 0; // Disable cache to fetch live inquiries

export default async function QueriesPage() {
  const queries = await prisma.contact.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="space-y-8 text-left">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Contact Queries</h1>
        <p className="text-slate-400 text-sm mt-1">Manage and resolve inquiries received from users.</p>
      </div>

      {/* Main Table Card */}
      <Card className="bg-slate-900/40 border-slate-800/80 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white">All Submissions</CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Showing {queries.length} total messages received
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Sender Details</th>
                  <th className="px-6 py-4">Subject & Message</th>
                  <th className="px-6 py-4">Date Received</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {queries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="h-8 w-8 text-slate-600" />
                        <span>No contact submissions found in the database.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  queries.map((query) => (
                    <tr key={query.id} className="hover:bg-slate-900/10 transition-colors align-top">
                      <td className="px-6 py-4 space-y-1">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-slate-500" />
                          {query.name}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-slate-500" />
                          <a href={`mailto:${query.email}`} className="hover:text-blue-400 transition-colors">
                            {query.email}
                          </a>
                        </div>
                        {query.phone && (
                          <div className="text-xs text-slate-500 flex items-center gap-1.5">
                            <Phone className="h-3 w-3 text-slate-500" />
                            <span>{query.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 space-y-1 max-w-[340px]">
                        <div className="font-bold text-slate-200">
                          {query.subject || "No Subject"}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">
                          {query.message}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-500" />
                          <span>
                            {new Date(query.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="text-slate-500 mt-0.5 ml-5">
                          {new Date(query.created_at).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <QueryStatusBtn id={query.id} currentStatus={query.status} />
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
