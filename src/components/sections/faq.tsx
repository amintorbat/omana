"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { getFaqContent } from "@/lib/content";

const faqContent = getFaqContent();

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className="bg-oman-cream/40 py-20 sm:py-24 lg:py-28">
      <div className="container space-y-12">
        <SectionHeading
          align="center"
          eyebrow={faqContent.heading.eyebrow}
          title={faqContent.heading.title}
          description={faqContent.heading.description}
        />
        <div className="space-y-4">
          {faqContent.items.map((item, index) => {
            const isOpen = index === activeIndex;
            return (
              <div
                key={item.question}
                className="rounded-3xl border border-white/70 bg-white/95 px-6 py-4 shadow-subtle transition-all duration-300 hover:border-oman-green/30"
              >
                <button
                  className="flex w-full items-center justify-between text-right"
                  onClick={() =>
                    setActiveIndex(isOpen ? -1 : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-oman-slate">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`transition ${
                      isOpen ? "rotate-180 text-oman-red" : "text-oman-slate/40"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 overflow-hidden text-sm leading-7 text-oman-slate/80 sm:text-base"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
