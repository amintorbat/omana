"use client";

import { useEffect, useState } from "react";

type PostItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  updatedAt: string;
};

const emptyForm: Omit<PostItem, "id" | "updatedAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  seoTitle: "",
  seoDescription: "",
  status: "DRAFT",
  publishedAt: "",
};

export default function AdminPostsPage() {
  const [items, setItems] = useState<PostItem[]>([]);
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
    const response = await fetch("/api/cms/posts?includeDrafts=true", {
      cache: "no-store",
    });

    const data = (await response.json()) as { items: PostItem[] };
    setItems(data.items);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onEdit = (item: PostItem) => {
    setActiveId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      seoTitle: item.seoTitle ?? "",
      seoDescription: item.seoDescription ?? "",
      status: item.status,
      publishedAt: item.publishedAt ? item.publishedAt.split("T")[0] : "",
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const response = await fetch(
      activeId ? `/api/cms/posts/${activeId}` : "/api/cms/posts",
      {
        method: activeId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          publishedAt: form.publishedAt || null,
        }),
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
    const response = await fetch(`/api/cms/posts/${id}`, {
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
        <h1 className="text-2xl font-bold text-oman-text">مدیریت بلاگ</h1>
        <p className="mt-2 text-sm text-oman-muted">
          مقالات بلاگ را ایجاد، ویرایش یا منتشر کنید.
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
                  <p className="text-xs text-oman-muted">{item.slug}</p>
                  <h3 className="text-lg font-semibold text-oman-text">
                    {item.title}
                  </h3>
                  <p className="text-sm text-oman-muted">{item.excerpt}</p>
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
            {activeId ? "ویرایش مقاله" : "ایجاد مقاله جدید"}
          </h2>
          <label className="block text-sm text-oman-muted">
            عنوان
            <input
              value={form.title}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, title: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
              required
            />
          </label>
          <label className="block text-sm text-oman-muted">
            اسلاگ
            <input
              value={form.slug}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, slug: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
              required
            />
          </label>
          <label className="block text-sm text-oman-muted">
            خلاصه
            <textarea
              value={form.excerpt}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, excerpt: event.target.value }))
              }
              className="mt-2 min-h-[90px] w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
              required
            />
          </label>
          <label className="block text-sm text-oman-muted">
            محتوای مقاله (HTML یا متن ساده)
            <textarea
              value={form.content}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, content: event.target.value }))
              }
              className="mt-2 min-h-[160px] w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
              required
            />
          </label>
          <label className="block text-sm text-oman-muted">
            عنوان سئو (اختیاری)
            <input
              value={form.seoTitle ?? ""}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, seoTitle: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
            />
          </label>
          <label className="block text-sm text-oman-muted">
            توضیحات سئو (اختیاری)
            <textarea
              value={form.seoDescription ?? ""}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  seoDescription: event.target.value,
                }))
              }
              className="mt-2 min-h-[90px] w-full rounded-2xl border border-oman-border/80 bg-oman-bg px-4 py-3 text-oman-text"
            />
          </label>
          <label className="block text-sm text-oman-muted">
            تاریخ انتشار (YYYY-MM-DD)
            <input
              value={form.publishedAt ?? ""}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, publishedAt: event.target.value }))
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
