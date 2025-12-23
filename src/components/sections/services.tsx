"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Briefcase,
  ScrollText,
  LineChart,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServicesContent } from "@/lib/content";
import { fadeInStagger, fadeInUp } from "@/lib/motion";

const icons: Record<string, LucideIcon> = {
  Plane,
  Briefcase,
  ScrollText,
  LineChart,
};

type ServiceItem = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
};

const iconKeys = ["Plane", "Briefcase", "ScrollText", "LineChart"];

type ServicesHeading = {
  eyebrow: string;
  title: string;
  description: string;
};

export const Services = ({
  items,
  heading,
}: {
  items?: ServiceItem[];
  heading?: ServicesHeading;
}) => {
  const servicesContent = getServicesContent();
  const resolvedItems =
    items && items.length > 0 ? items : servicesContent.items;
  const resolvedHeading = heading ?? servicesContent.heading;

  return (
    <section id="services" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container space-y-14">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title}
          description={resolvedHeading.description}
        />
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInStagger}
        >
          {resolvedItems.map((service, index) => {
            const Icon = icons[iconKeys[index % iconKeys.length]];
            return (
              <motion.div key={service.slug} variants={fadeInUp}>
                <Card className="h-full space-y-4 border-border/60 bg-surface">
                  <div className="flex items-center gap-4 text-primary">
                    {Icon && (
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-background to-surface text-primary">
                        <Icon />
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-text">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-muted sm:text-base">
                    {service.excerpt}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
