import Link from "next/link";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { fetchServices } from "@/lib/cms-client";
import { getServicesContent } from "@/lib/content";

export const metadata = {
  title: "خدمات اومانا",
  description:
    "خدمات اومانا شامل سفرهای تفریحی ممتاز، تورهای تجاری، ثبت شرکت و سرمایه‌گذاری در عمان است.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const servicesContent = await fetchServices();
  const localContent = getServicesContent();
  const servicesItems =
    servicesContent.items.length > 0 ? servicesContent.items : localContent.items;

  return (
    <main className="bg-oman-bg py-20 sm:py-24 lg:py-28">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={localContent.heading.eyebrow}
          title={localContent.heading.title}
          description={localContent.heading.description}
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {servicesItems.map((service) => (
            <Card
              key={service.slug}
              className="border-oman-border/70 bg-oman-surface"
            >
              <div className="space-y-4 text-right">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-oman-green/80">
                    SERVICE
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-oman-text">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-oman-muted sm:text-base">
                  {service.excerpt}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-oman-red hover:text-oman-green"
                >
                  مشاهده جزئیات
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
