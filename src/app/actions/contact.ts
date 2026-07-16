"use server";

import prisma from "@/lib/db";
import { resend } from "@/lib/resend";

export type ContactResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function submitContact(formData: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<ContactResponse> {
  try {
    // 1. Server-side validations
    if (!formData.name || !formData.name.trim()) {
      return { success: false, error: "Name is required." };
    }

    if (!formData.email || !formData.email.trim()) {
      return { success: false, error: "Email is required." };
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!formData.message || !formData.message.trim()) {
      return { success: false, error: "Message is required." };
    }

    if (formData.message.trim().length < 10) {
      return { success: false, error: "Message must be at least 10 characters long." };
    }

    // 2. Insert record into contacts database
    const newContact = await prisma.contact.create({
      data: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        subject: formData.subject?.trim() || null,
        message: formData.message.trim(),
        status: "Pending", // Set inquiry status to "Pending"
      },
    });

    // 3. Send email to admin using Resend SDK (wrapped in try/catch to prevent blocking the response)
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail) {
        console.error("ADMIN_EMAIL is not defined in environment variables. Resend email not sent.");
      } else {
        await resend.emails.send({
          from: "Contact Form <onboarding@resend.dev>",
          to: adminEmail,
          subject: "New Contact Query",
          text: `You have received a new contact query.

Name: ${newContact.name}
Email: ${newContact.email}
Subject: ${newContact.subject || "No Subject"}

Message Summary:
${newContact.message.substring(0, 150)}${newContact.message.length > 150 ? "..." : ""}

Full message is stored in the database.`,
        });
      }
    } catch (emailError) {
      console.error("Error sending notification email via Resend:", emailError);
    }

    return {
      success: true,
      message: "Message submitted successfully!",
    };
  } catch (error: any) {
    console.error("Database submission error in submitContact Server Action:", error);
    return {
      success: false,
      error: "Failed to submit message to the database. Please check connection settings.",
    };
  }
}
