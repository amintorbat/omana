import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { fetchServiceBySlug } from "@/lib/cms-client";
import { getServiceBySlug } from "@/lib/content";

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export const dynamic = "force-dynamic";

export const generateMetadata = async ({
  params,
}: ServicePageProps): Promise<Metadata> => {
  const service = await fetchServiceBySlug(params.slug);
  const localService = getServiceBySlug(params.slug);
  const resolvedService = service ?? localService;
  if (!resolvedService) {
    return {
      title: "خدمت یافت نشد | اومانا",
    };
  }

  return {
    title: `${resolvedService.title} | اومانا`,
    description: resolvedService.excerpt ?? resolvedService.body ?? "",
  };
};

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await fetchServiceBySlug(params.slug);
  const localService = getServiceBySlug(params.slug);
  const resolvedService = service ?? localService;

  if (!resolvedService) {
    notFound();
  }
  const body =
    resolvedService.body ??
    ("description" in resolvedService ? resolvedService.description : undefined) ??
    resolvedService.excerpt ??
    "";

  return (
    <main className="bg-oman-bg py-20 sm:py-24 lg:py-28">
      <div className="container space-y-12">
        <div className="space-y-6 text-right">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-semibold text-oman-green hover:text-oman-red"
          >
            بازگشت به خدمات
          </Link>
          <SectionHeading
            eyebrow="SERVICE"
            title={resolvedService.title}
            description={
              resolvedService.excerpt ??
              ("description" in resolvedService
                ? resolvedService.description
                : undefined) ??
              ""
            }
          />
        </div>

        <Card className="border-oman-border/70 bg-oman-surface">
          <div className="space-y-6 text-right">
            <p className="text-base leading-8 text-oman-muted sm:text-lg">
              {body}
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
