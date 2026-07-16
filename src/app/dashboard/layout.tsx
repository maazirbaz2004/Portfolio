import prisma from "@/lib/db";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  // Fetch role from profile table
  const profile = await prisma.profile.findUnique({
    where: { auth_user_id: user.id },
  });

  if (!profile || profile.role !== "ADMIN") {
    // Prevent locking session by signing out non-admins
    await supabase.auth.signOut();
    redirect("/login?error=Unauthorized. Admins only.");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <DashboardSidebar adminName={profile.name} />
      <main className="flex-1 bg-slate-950 text-slate-100 overflow-y-auto max-h-screen p-8 sm:p-10 relative">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
