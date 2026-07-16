"use server";

import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import prisma from "@/lib/db";

export type AuthState = {
  error?: string;
  success?: boolean;
};

async function recordFailedAttempt(ip: string) {
  const attempt = await prisma.loginAttempt.findUnique({
    where: { ip_address: ip },
  });

  const now = new Date();
  if (!attempt) {
    await prisma.loginAttempt.create({
      data: {
        ip_address: ip,
        attempts: 1,
        last_attempt_at: now,
      },
    });
  } else {
    const newAttempts = attempt.attempts + 1;
    let blockedUntil: Date | null = null;
    if (newAttempts >= 5) {
      // Block for 15 minutes cooldown
      blockedUntil = new Date(now.getTime() + 15 * 60000);
    }
    await prisma.loginAttempt.update({
      where: { ip_address: ip },
      data: {
        attempts: newAttempts,
        last_attempt_at: now,
        blocked_until: blockedUntil,
      },
    });
  }
}

async function recordSuccessfulAttempt(ip: string) {
  await prisma.loginAttempt.upsert({
    where: { ip_address: ip },
    update: {
      attempts: 0,
      blocked_until: null,
    },
    create: {
      ip_address: ip,
      attempts: 0,
      blocked_until: null,
    },
  });
}

export async function loginUser(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const recaptchaToken = formData.get("recaptchaToken") as string;

  if (!email || !email.trim()) {
    return { error: "Email is required." };
  }
  if (!password) {
    return { error: "Password is required." };
  }

  // 1. Get client IP address securely
  let clientIp = "127.0.0.1";
  try {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    clientIp = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";
  } catch (err) {
    console.error("Failed to get client IP from headers:", err);
  }

  // 2. Check rate limit block status
  const now = new Date();
  const attempt = await prisma.loginAttempt.findUnique({
    where: { ip_address: clientIp },
  });

  if (attempt && attempt.blocked_until && attempt.blocked_until > now) {
    const timeLeftMs = attempt.blocked_until.getTime() - now.getTime();
    const timeLeftMins = Math.ceil(timeLeftMs / 60000);
    return { error: `Too many attempts. Try again in ${timeLeftMins} minute${timeLeftMins > 1 ? "s" : ""}.` };
  }

  // If previous block expired, clear it
  if (attempt && attempt.blocked_until && attempt.blocked_until <= now) {
    await prisma.loginAttempt.update({
      where: { ip_address: clientIp },
      data: {
        attempts: 0,
        blocked_until: null,
      },
    });
  }

  // 3. Google reCAPTCHA v3 Validation
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    if (!recaptchaToken) {
      await recordFailedAttempt(clientIp);
      return { error: "Security check is missing. Please try again." };
    }

    try {
      const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      });
      const data = await response.json();

      if (!data.success) {
        await recordFailedAttempt(clientIp);
        return { error: "Security check failed. Please refresh and try again." };
      }

      if (data.score !== undefined && data.score < 0.5) {
        await recordFailedAttempt(clientIp);
        return { error: "Automated activity detected. Access denied." };
      }
    } catch (err) {
      console.error("reCAPTCHA validation failed:", err);
      // Fallback: do not block genuine logins if the Google API is unreachable
    }
  }

  // 4. Authenticate credentials
  let success = false;
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      await recordFailedAttempt(clientIp);
      return { error: error.message };
    }
    success = true;
  } catch (err: any) {
    await recordFailedAttempt(clientIp);
    return { error: err.message || "An unexpected error occurred during login." };
  }

  if (success) {
    await recordSuccessfulAttempt(clientIp);
    redirect("/dashboard");
  }

  return {};
}

export async function logoutUser() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Error signing out:", err);
  }
  redirect("/login");
}

