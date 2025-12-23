"use client";

import { useEffect, useState } from "react";

type SettingsForm = {
  whatsappE164: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
};

const emptyForm: SettingsForm = {
  whatsappE164: "",
  email: "",
  address: "",
  heroTitle: "",
  heroSubtitle: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<string | null>(null);

  const loadSettings = async () => {
    const session = await fetch("/api/cms/session", { cache: "no-store" });
    const sessionData = (await session.json()) as { authenticated: boolean };
    if (!sessionData.authenticated) {
      window.location.href = "/admin/login";
      return;
    }
    const response = await fetch("/api/cms/settings", { cache: "no-store" });
    const data = (await response.json()) as SettingsForm;
    setForm({
      whatsappE164: data.whatsappE164 ?? "",
      email: data.email ?? "",
      address: data.address ?? "",
      heroTitle: data.heroTitle ?? "",
      heroSubtitle: data.heroSubtitle ?? "",
    });
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const response = await fetch("/api/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      setStatus("ذخیره انجام نشد.");
      return;
    }

    setStatus("ذخیره شد.");
  };

  return (
    <div className="space-y-8 text-right">
      <div>
        <h1 className="text-2xl font-bold text-oman-text">تنظیمات سایت</h1>
        <p className="mt-2 text-sm text-oman-muted">
          اطلاعات تماس و پیام‌های اصلی صفحه را مدیریت کنید.
        </p>
      </div>

      <form
        className="space-y-4 rounded-3xl border border-oman-border/70 bg-oman-surface p-6"
        onSubmit={onSubmit}
      >
        <label className="block text-sm text-oman-muted">
          واتساپ (E164)
          <input
            value={form.whatsappE164}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                whatsappE164: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
          />
        </label>
        <label className="block text-sm text-oman-muted">
          ایمیل
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
          />
        </label>
        <label className="block text-sm text-oman-muted">
          آدرس (اختیاری)
          <input
            value={form.address}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, address: event.target.value }))
            }
            className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
          />
        </label>
        <label className="block text-sm text-oman-muted">
          تیتر هیرو
          <input
            value={form.heroTitle}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, heroTitle: event.target.value }))
            }
            className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
          />
        </label>
        <label className="block text-sm text-oman-muted">
          زیرتیتر هیرو
          <textarea
            value={form.heroSubtitle}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, heroSubtitle: event.target.value }))
            }
            className="mt-2 min-h-[120px] w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
          />
        </label>
        {status ? <p className="text-xs text-oman-muted">{status}</p> : null}
        <button
          type="submit"
          className="w-full rounded-full bg-oman-green px-6 py-3 text-sm font-semibold text-white shadow-soft"
        >
          ذخیره
        </button>
      </form>
    </div>
  );
}
