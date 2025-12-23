import Link from "next/link";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { fetchPosts } from "@/lib/cms-client";
import { getPostsContent } from "@/lib/content";

export const metadata = {
  title: "بلاگ اومانا",
  description: "تحلیل‌ها، راهنماها و تجربه‌های اومانا برای ورود مطمئن به عمان.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await fetchPosts();
  const localPosts = getPostsContent();
  const postItems = posts.items.length > 0 ? posts.items : localPosts;
  return (
    <main className="bg-oman-bg py-20 sm:py-24 lg:py-28">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="BLOG"
          title="بلاگ اومانا"
          description="تحلیل‌ها و راهنماهای اجرایی برای سرمایه‌گذاری، تور تجاری و توسعه کسب‌وکار در عمان."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {postItems.map((post) => (
            <Card
              key={post.slug}
              className="flex h-full flex-col border-oman-border/70 bg-oman-surface"
            >
              <div className="space-y-4 text-right">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-oman-green/80">
                    ARTICLE
                  </p>
                  <h3 className="text-xl font-bold text-oman-text">
                    {post.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-oman-muted sm:text-base">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-oman-muted">
                  <span>
                    {post.publishedAt ? post.publishedAt.split("T")[0] : "—"}
                  </span>
                  <span>مطالعه سریع</span>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-oman-red hover:text-oman-green"
                >
                  مطالعه مقاله
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
