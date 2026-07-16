import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { UserRole } from "@prisma/client";
import prisma from "../src/lib/db";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME || "Admin User";

async function main() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  }
  if (!adminEmail || !adminPassword) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables.");
  }

  console.log(`Connecting to Supabase at ${supabaseUrl}...`);
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });


  try {
    console.log(`Checking if auth user exists for email: ${adminEmail}`);
    const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
      throw new Error(`Error listing auth users: ${listError.message}`);
    }

    let authUser = listData.users.find((u) => u.email === adminEmail);
    let authUserId: string;

    if (authUser) {
      console.log(`Auth user already exists. ID: ${authUser.id}`);
      authUserId = authUser.id;
    } else {
      console.log(`Auth user does not exist. Creating...`);
      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: {
          name: adminName
        }
      });

      if (createError) {
        throw new Error(`Error creating auth user: ${createError.message}`);
      }

      if (!createData.user) {
        throw new Error("User creation succeeded but no user data returned.");
      }

      authUser = createData.user;
      authUserId = authUser.id;
      console.log(`Auth user created successfully. ID: ${authUserId}`);
    }

    // Now upsert into the Profiles table
    console.log(`Checking Profile for auth_user_id: ${authUserId} or email: ${adminEmail}`);

    const existingProfile = await prisma.profile.findFirst({
      where: {
        OR: [
          { auth_user_id: authUserId },
          { email: adminEmail }
        ]
      }
    });

    if (existingProfile) {
      console.log(`Profile already exists. Updating Profile ID: ${existingProfile.id}`);
      const updatedProfile = await prisma.profile.update({
        where: { id: existingProfile.id },
        data: {
          auth_user_id: authUserId,
          name: adminName,
          email: adminEmail,
          role: UserRole.ADMIN,
        }
      });
      console.log("Profile updated:", updatedProfile);
    } else {
      console.log("Profile does not exist. Creating...");
      const newProfile = await prisma.profile.create({
        data: {
          auth_user_id: authUserId,
          name: adminName,
          email: adminEmail,
          role: UserRole.ADMIN,
        }
      });
      console.log("Profile created:", newProfile);
    }

    console.log("Admin user seeding complete!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
