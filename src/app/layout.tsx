import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omana.vercel.app"),
  title: {
    default: "اومانا | سرمایه‌گذاری و توسعه کسب‌وکار در عمان",
    template: "%s | اومانا",
  },
  description:
    "اومانا پلتفرم معتمد برندها و سرمایه‌گذاران ایرانی برای ثبت شرکت، جذب سرمایه و توسعه عملیات در عمان است.",
  authors: [
    {
      name: "Torbate Esfahani Agency",
      url: "https://torbatesfahaniagency.ir",
    },
  ],
  keywords: [
    "سرمایه گذاری عمان",
    "ثبت شرکت در عمان",
    "مهاجرت تجاری",
    "Oman investment",
    "Omana consulting",
  ],
  openGraph: {
    title: "اومانا - ورود مطمئن به بازار عمان",
    description:
      "همراه راهبردی شما برای تحلیل بازار، ثبت شرکت، جذب سرمایه و رشد در عمان.",
    url: "https://omana.vercel.app",
    siteName: "اومانا",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "اومانا | Oman Market Landing",
    description:
      "سرویس جامع استقرار، فایننس و توسعه کسب‌وکار در عمان ویژه برندهای ایرانی.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} antialiased text-oman-slate`}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
