"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { getWhyOmanContent } from "@/lib/content";
import { fadeInStagger, fadeInUp } from "@/lib/motion";

const whyOmanContent = getWhyOmanContent();

export const WhyOman = () => {
  return (
    <section id="why-oman" className="bg-oman-cream/60 py-20 sm:py-24 lg:py-28">
      <div className="container space-y-12">
        <SectionHeading
          align="center"
          eyebrow={whyOmanContent.heading.eyebrow}
          title={whyOmanContent.heading.title}
          description={whyOmanContent.heading.description}
        />
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInStagger}
        >
          {whyOmanContent.paragraphs.map((paragraph, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full border-white/70 bg-white">
                <p className="text-base leading-8 text-oman-slate/80">{paragraph}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
