"use client";

import { useEffect, useState } from "react";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  order: number;
  status: "DRAFT" | "PUBLISHED";
};

const emptyForm: Omit<FaqItem, "id"> = {
  question: "",
  answer: "",
  order: 0,
  status: "DRAFT",
};

export default function AdminFaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const loadItems = async () => {
    const session = await fetch("/api/cms/session", { cache: "no-store" });
    const sessionData = (await session.json()) as { authenticated: boolean };
    if (!sessionData.authenticated) {
      window.location.href = "/admin/login";
      return;
    }
    const response = await fetch("/api/cms/faqs?includeDrafts=true", {
      cache: "no-store",
    });

    const data = (await response.json()) as { items: FaqItem[] };
    setItems(data.items);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onEdit = (item: FaqItem) => {
    setActiveId(item.id);
    setForm({
      question: item.question,
      answer: item.answer,
      order: item.order,
      status: item.status,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const response = await fetch(
      activeId ? `/api/cms/faqs/${activeId}` : "/api/cms/faqs",
      {
        method: activeId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      setStatus("ذخیره انجام نشد.");
      return;
    }

    setStatus("ذخیره شد.");
    setActiveId(null);
    setForm(emptyForm);
    await loadItems();
  };

  const onDelete = async (id: number) => {
    const response = await fetch(`/api/cms/faqs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      setStatus("حذف انجام نشد.");
      return;
    }

    setStatus("حذف شد.");
    if (activeId === id) {
      setActiveId(null);
      setForm(emptyForm);
    }
    await loadItems();
  };

  return (
    <div className="space-y-8 text-right">
      <div>
        <h1 className="text-2xl font-bold text-oman-text">مدیریت سوالات</h1>
        <p className="mt-2 text-sm text-oman-muted">
          سوالات متداول را مرتب و منتشر کنید.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-oman-border/70 bg-oman-surface p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-oman-text">
                    {item.question}
                  </h3>
                  <p className="text-sm text-oman-muted">{item.answer}</p>
                </div>
                <span className="rounded-full border border-oman-border/80 px-3 py-1 text-xs text-oman-muted">
                  {item.status === "PUBLISHED" ? "منتشر شده" : "پیش‌نویس"}
                </span>
              </div>
              <div className="mt-3 flex gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="rounded-full border border-oman-border/80 px-3 py-1 text-oman-text hover:text-oman-green"
                >
                  ویرایش
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="rounded-full border border-oman-border/80 px-3 py-1 text-oman-red hover:text-oman-green"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>

        <form
          className="space-y-4 rounded-3xl border border-oman-border/70 bg-oman-surface p-6"
          onSubmit={onSubmit}
        >
          <h2 className="text-lg font-semibold text-oman-text">
            {activeId ? "ویرایش سوال" : "ایجاد سوال جدید"}
          </h2>
          <label className="block text-sm text-oman-muted">
            سوال
            <input
              value={form.question}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, question: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
              required
            />
          </label>
          <label className="block text-sm text-oman-muted">
            پاسخ
            <textarea
              value={form.answer}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, answer: event.target.value }))
              }
              className="mt-2 min-h-[120px] w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
              required
            />
          </label>
          <label className="block text-sm text-oman-muted">
            ترتیب نمایش
            <input
              type="number"
              value={form.order}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  order: Number(event.target.value),
                }))
              }
              className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
            />
          </label>
          <label className="block text-sm text-oman-muted">
            وضعیت
            <select
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  status: event.target.value as "DRAFT" | "PUBLISHED",
                }))
              }
              className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
            >
              <option value="DRAFT">پیش‌نویس</option>
              <option value="PUBLISHED">منتشر شده</option>
            </select>
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
    </div>
  );
}
