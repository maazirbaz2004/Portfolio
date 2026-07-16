"use client";

import React, { useState } from "react";
import { Send, Rocket, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/app/actions/contact";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    };
    let hasError = false;

    // Client-side Validation rules
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
      hasError = true;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      hasError = true;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await submitContact(formData);
      if (res.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setErrors({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setSubmitError(res.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setSubmitError("Failed to connect to database. If you haven't set up Supabase yet, please configure DATABASE_URL in your .env file.");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-[#f8fafc] dark:bg-slate-900/40 relative"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Collaboration CTA Banner */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white dark:bg-slate-950 border-slate-200/50 dark:border-slate-800/80 shadow-md rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 text-left">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-portfolio-accentBlue border border-blue-100 dark:border-blue-900/30">
                  <Rocket className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    Interested in collaborating or have a project in mind?
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Let's work together and build something amazing.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  const formEl = document.getElementById("contact-form");
                  if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 flex-shrink-0 self-start md:self-auto"
              >
                Let's Connect
                <Send className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-portfolio-accentBlue">
            Get In Touch
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Send Me A Message
          </p>
          <div className="h-1 w-12 bg-portfolio-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Form Container */}
        <div id="contact-form" className="max-w-2xl mx-auto">
          <Card className="bg-white dark:bg-slate-950 border-slate-200/50 dark:border-slate-800/80 shadow-md rounded-3xl p-6 sm:p-8">
            <CardContent className="p-0">
              
              {status === "success" ? (
                <div className="text-center py-8 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you for reaching out. I have received your message and will get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setStatus("idle")}
                    variant="outline"
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  
                  {submitError && (
                    <div className="flex items-start gap-2.5 p-4 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold leading-relaxed">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-bold text-slate-705 dark:text-slate-350 uppercase tracking-wide"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className={`bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 ${
                          errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                        disabled={status === "loading"}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-bold text-slate-705 dark:text-slate-350 uppercase tracking-wide"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 ${
                          errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                        disabled={status === "loading"}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-xs font-bold text-slate-705 dark:text-slate-350 uppercase tracking-wide"
                      >
                        Phone Number <span className="text-slate-400 dark:text-slate-500 font-normal lowercase">(optional)</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="e.g. +1 (555) 0199"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
                        disabled={status === "loading"}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-xs font-bold text-slate-705 dark:text-slate-350 uppercase tracking-wide"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Collaboration opportunity"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 ${
                          errors.subject ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                        disabled={status === "loading"}
                      />
                      {errors.subject && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold text-slate-705 dark:text-slate-350 uppercase tracking-wide"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Hi Maaz, I would love to talk about..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 min-h-[120px] ${
                        errors.message ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                      disabled={status === "loading"}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* reCAPTCHA v3 Visual Mockup */}
                  <div className="flex items-center gap-1.5 justify-start text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span>Protected by Google reCAPTCHA v3</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Submit Message"}
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}

            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
