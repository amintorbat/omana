"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { getProcessContent } from "@/lib/content";
import { fadeInStagger, fadeInUp } from "@/lib/motion";

const processContent = getProcessContent();

export const Process = () => {
  return (
    <section id="process" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container space-y-14">
        <SectionHeading
          eyebrow={processContent.heading.eyebrow}
          title={processContent.heading.title}
          description={processContent.heading.description}
        />
        <motion.ol
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInStagger}
        >
          {processContent.steps.map((step, index) => (
            <motion.li
              key={step.title}
              variants={fadeInUp}
              className="relative rounded-3xl border border-white/70 bg-gradient-to-br from-white to-oman-cream/70 p-6 shadow-subtle"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-black text-oman-red shadow-subtle">
                  {index + 1}
                </span>
                <span className="text-xs font-semibold text-oman-green">
                  {step.time}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-oman-slate">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-oman-slate/80 sm:text-base">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};
