"use server";

import prisma from "@/lib/db";
import { createClient } from "@/lib/supabase";
import { ContactStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateQueryStatus(id: string, status: ContactStatus) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    const profile = await prisma.profile.findUnique({
      where: { auth_user_id: user.id },
    });

    if (!profile || profile.role !== "ADMIN") {
      return { success: false, error: "Unauthorized. Admin role required." };
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/queries");

    return { success: true, updated };
  } catch (err: any) {
    console.error("Error updating query status:", err);
    return { success: false, error: err.message || "Failed to update query status." };
  }
}
