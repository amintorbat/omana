"use client";

import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [checking, setChecking] = useState(true);

  const checkSession = async () => {
    try {
      const response = await fetch("/api/cms/session", { cache: "no-store" });
      if (!response.ok) {
        setChecking(false);
        return;
      }
      const data = (await response.json()) as { authenticated: boolean };
      if (data.authenticated) {
        window.location.href = "/admin";
        return;
      }
      setChecking(false);
    } catch {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await fetch("/api/cms/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
      window.location.href = "/admin";
      return;
    }

    if (response.status === 403) {
      setError("دسترسی پنل مدیریت غیرفعال است.");
      return;
    }
    setError("ایمیل یا رمز عبور نادرست است.");
  };

  return (
    <main className="min-h-screen bg-oman-bg">
      <div className="container flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-oman-border/70 bg-oman-surface p-8 shadow-subtle">
          <h1 className="text-right text-2xl font-bold text-oman-text">
            ورود به پنل مدیریت
          </h1>
          <p className="mt-2 text-right text-sm text-oman-muted">
            اطلاعات ورود را از فایل محیطی دریافت کنید.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block text-right text-sm text-oman-muted">
              ایمیل
              <input
                name="email"
                type="email"
              className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text outline-none focus:border-oman-green"
              required
            />
            </label>
            <label className="block text-right text-sm text-oman-muted">
              رمز عبور
              <input
                type="password"
                name="password"
                className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text outline-none focus:border-oman-green"
                required
              />
            </label>
            {error ? (
              <p className="text-right text-xs text-oman-red">{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading || checking}
              className="w-full rounded-full bg-oman-red px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-60"
            >
              {checking ? "در حال بررسی..." : loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
