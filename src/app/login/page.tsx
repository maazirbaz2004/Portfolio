"use client";

import React, { useActionState, useState, startTransition } from "react";
import { Mail, Lock, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/app/actions/auth";
import Script from "next/script";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, {});
  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Client-side validation
    if (!email || !email.trim()) {
      setClientError("Email address is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setClientError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setClientError("Password is required.");
      return;
    }

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      startTransition(() => {
        formAction(formData);
      });
      return;
    }

    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha) {
      setClientError("Security check (reCAPTCHA) is still loading. Please try again.");
      return;
    }

    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action: "login" })
        .then((token: string) => {
          formData.set("recaptchaToken", token);
          startTransition(() => {
            formAction(formData);
          });
        })
        .catch((err: any) => {
          console.error("reCAPTCHA execution failed:", err);
          setClientError("Security check failed. Please refresh and try again.");
        });
    });
  };

  const activeError = clientError || state.error;

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            Admin Portal
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access contact submissions and portfolio stats
          </p>
        </div>

        <Card className="bg-slate-900/60 border-slate-800/80 shadow-2xl backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-bold text-white text-left">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-left text-slate-400 text-xs">
              Enter your admin credentials to login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeError && (
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold leading-relaxed border border-destructive/20 text-left">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{activeError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-bold text-slate-400 uppercase tracking-wide"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="pl-11 bg-slate-950/50 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-blue-500"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-xs font-bold text-slate-400 uppercase tracking-wide"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-11 bg-slate-950/50 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-blue-500"
                    disabled={isPending}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors mt-6 h-11"
                disabled={isPending}
              >
                {isPending ? "Signing In..." : "Sign In"}
                {!isPending && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
    </main>
  );
}
