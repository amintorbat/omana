"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { getFaqContent } from "@/lib/content";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqHeading = {
  eyebrow: string;
  title: string;
  description: string;
};

export const FAQ = ({
  items,
  heading,
}: {
  items?: FaqItem[];
  heading?: FaqHeading;
}) => {
  const faqContent = getFaqContent();
  const resolvedItems = items && items.length > 0 ? items : faqContent.items;
  const resolvedHeading = heading ?? faqContent.heading;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="container space-y-12">
        <SectionHeading
          align="center"
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title}
          description={resolvedHeading.description}
        />
        <div className="space-y-4">
          {resolvedItems.map((item, index) => {
            const isOpen = index === activeIndex;
            return (
              <div
                key={`${item.question}-${index}`}
                className="rounded-3xl border border-border/70 bg-surface px-6 py-4 shadow-subtle transition-all duration-300 hover:border-primary/30"
              >
                <button
                  className="flex w-full items-center justify-between text-right"
                  onClick={() =>
                    setActiveIndex(isOpen ? -1 : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-text">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`transition ${
                      isOpen ? "rotate-180 text-accent" : "text-muted/50"
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
                      className="mt-3 overflow-hidden text-sm leading-7 text-muted sm:text-base"
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
