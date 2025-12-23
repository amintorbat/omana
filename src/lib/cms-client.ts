import { headers } from "next/headers";

const resolveBaseUrl = () => {
  try {
    const headerList = headers();
    const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
    if (host) {
      const protocol = headerList.get("x-forwarded-proto") ?? "http";
      return `${protocol}://${host}`;
    }
  } catch {
    // noop - fallback below
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
};

const fetchCms = async <T>(
  path: string,
  fallback: T,
  revalidate = 60
): Promise<T> => {
  try {
    const baseUrl = resolveBaseUrl();
    const response = await fetch(`${baseUrl}${path}`, {
      next: { revalidate },
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
};

export const fetchServices = () =>
  fetchCms<{ items: ServiceDto[] }>("/api/cms/services", { items: [] });

export const fetchServiceBySlug = async (slug: string) => {
  const data = await fetchCms<{ items: ServiceDto[] }>(
    `/api/cms/services?slug=${encodeURIComponent(slug)}`,
    { items: [] }
  );
  return data.items[0] ?? null;
};

export const fetchPosts = () =>
  fetchCms<{ items: PostDto[] }>("/api/cms/posts", { items: [] });

export const fetchPostBySlug = async (slug: string) => {
  const data = await fetchCms<{ items: PostDto[] }>(
    `/api/cms/posts?slug=${encodeURIComponent(slug)}`,
    { items: [] }
  );
  return data.items[0] ?? null;
};

export const fetchFaqs = () =>
  fetchCms<{ items: FaqDto[] }>("/api/cms/faqs", { items: [] });

export const fetchSiteSettings = () =>
  fetchCms<SiteSettingsDto>(
    "/api/cms/settings",
    {
      whatsappE164: "",
      email: "",
      address: null,
      heroTitle: "",
      heroSubtitle: "",
    },
    60
  );

export type ServiceDto = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  updatedAt: string;
};

export type PostDto = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  updatedAt: string;
};

export type FaqDto = {
  id: number;
  question: string;
  answer: string;
  order: number;
  status: "DRAFT" | "PUBLISHED";
};

export type SiteSettingsDto = {
  whatsappE164: string;
  email: string;
  address: string | null;
  heroTitle: string;
  heroSubtitle: string;
};
