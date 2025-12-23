import Link from "next/link";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-oman-bg">
      <header className="border-b border-oman-border/70 bg-oman-surface">
        <div className="container flex items-center justify-between py-4">
          <Link href="/admin" className="text-lg font-bold text-oman-text">
            Omana CMS
          </Link>
          <nav className="flex items-center gap-4 text-sm text-oman-muted">
            <Link href="/admin/services" className="hover:text-oman-green">
              خدمات
            </Link>
            <Link href="/admin/posts" className="hover:text-oman-green">
              بلاگ
            </Link>
            <Link href="/admin/faq" className="hover:text-oman-green">
              سوالات
            </Link>
            <Link href="/admin/settings" className="hover:text-oman-green">
              تنظیمات
            </Link>
          </nav>
          <form
            action="/api/cms/logout"
            method="post"
            className="text-sm text-oman-muted"
          >
            <button
              type="submit"
              className="rounded-full border border-oman-border/80 px-4 py-2 text-oman-text hover:text-oman-red"
            >
              خروج
            </button>
          </form>
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  );
}
