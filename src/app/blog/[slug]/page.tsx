import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { fetchPostBySlug } from "@/lib/cms-client";
import { getPostBySlug } from "@/lib/content";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export const dynamic = "force-dynamic";

export const generateMetadata = async ({
  params,
}: BlogPageProps): Promise<Metadata> => {
  const post = await fetchPostBySlug(params.slug);
  const localPost = getPostBySlug(params.slug);
  const resolvedPost = post ?? localPost;
  if (!resolvedPost) {
    return {
      title: "مقاله یافت نشد | اومانا",
    };
  }

  return {
    title: `${resolvedPost.title} | اومانا`,
    description: resolvedPost.excerpt,
    openGraph: {
      title: resolvedPost.title,
      description: resolvedPost.excerpt,
      type: "article",
    },
  };
};

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const post = await fetchPostBySlug(params.slug);
  const localPost = getPostBySlug(params.slug);
  const resolvedPost = post ?? localPost;

  if (!resolvedPost) {
    notFound();
  }

  return (
    <main className="bg-oman-bg py-20 sm:py-24 lg:py-28">
      <div className="container space-y-10">
        <div className="space-y-6 text-right">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-oman-green hover:text-oman-red"
          >
            بازگشت به بلاگ
          </Link>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-oman-green/80">
              ARTICLE
            </p>
            <h1 className="text-3xl font-black leading-tight text-oman-text sm:text-4xl">
              {resolvedPost.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-oman-muted">
              <span>
                {resolvedPost.publishedAt
                  ? resolvedPost.publishedAt.split("T")[0]
                  : "—"}
              </span>
              <span>مطالعه سریع</span>
            </div>
          </div>
        </div>

        <Card className="border-oman-border/70 bg-oman-surface">
          <article
            className="space-y-5 text-right text-sm leading-8 text-oman-muted sm:text-base"
            dangerouslySetInnerHTML={{ __html: resolvedPost.content }}
          />
        </Card>
      </div>
    </main>
  );
}
