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

const servicesContent = getServicesContent();
const icons: Record<string, LucideIcon> = {
  Plane,
  Briefcase,
  ScrollText,
  LineChart,
};

export const Services = () => {
  return (
    <section id="services" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container space-y-14">
        <SectionHeading
          eyebrow={servicesContent.heading.eyebrow}
          title={servicesContent.heading.title}
          description={servicesContent.heading.description}
        />
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInStagger}
        >
          {servicesContent.items.map((service) => {
            const Icon = icons[service.icon];
            return (
              <motion.div key={service.title} variants={fadeInUp}>
                <Card className="h-full space-y-4 border-white/60 bg-white/90">
                  <div className="flex items-center gap-4 text-oman-red">
                    {Icon && (
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-oman-cream to-white text-oman-red">
                        <Icon />
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-oman-slate">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-oman-slate/80 sm:text-base">
                    {service.description}
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
