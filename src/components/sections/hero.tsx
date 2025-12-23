"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fadeInStagger, fadeInUp } from "@/lib/motion";

import { getHeroContent } from "@/lib/content";

const heroContent = getHeroContent();

type HeroProps = {
  heroTitle?: string;
  heroSubtitle?: string;
};

export const Hero = ({ heroTitle, heroSubtitle }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-oman-cream/70 py-20 sm:py-24 lg:py-32"
    >
      <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="space-y-8 text-right"
          initial="hidden"
          animate="show"
          variants={fadeInStagger}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center rounded-full border border-oman-green/20 px-4 py-2 text-xs font-semibold text-oman-green"
          >
            {heroContent.eyebrow}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-black leading-tight text-oman-slate sm:text-5xl lg:text-6xl"
          >
            {heroTitle || heroContent.title}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base leading-relaxed text-oman-slate/80 sm:text-lg lg:max-w-xl"
          >
            {heroSubtitle || heroContent.description}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4"
          >
            <Button asChild className="px-8 py-3">
              <Link href={heroContent.primaryCta.href}>
                {heroContent.primaryCta.label}
              </Link>
            </Button>
            <Button
              asChild
              variant="subtle"
              className="px-8 py-3 text-oman-red"
            >
              <Link href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
              </Link>
            </Button>
          </motion.div>
          <motion.dl
            variants={fadeInUp}
            className="grid grid-cols-3 gap-6 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-subtle"
          >
            {heroContent.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-xs font-medium text-oman-slate/60">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-black text-oman-slate sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Card glow className="relative h-full min-h-[380px] overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-hero-grid opacity-80" />
            <div className="relative flex h-full flex-col justify-between space-y-8">
              <div>
                <p className="text-sm font-semibold text-oman-green">
                  {heroContent.card.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-black text-oman-slate lg:text-3xl">
                  {heroContent.card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-oman-slate/80">
                  {heroContent.card.description}
                </p>
              </div>
              <div className="grid gap-4 rounded-2xl border border-white/40 bg-white/80 p-4">
                {heroContent.stats.map((stat) => (
                  <div
                    key={`card-${stat.label}`}
                    className="flex items-center justify-between rounded-2xl bg-oman-cream/40 px-4 py-3"
                  >
                    <p className="text-xs text-oman-slate/60">{stat.label}</p>
                    <p className="text-lg font-bold text-oman-red">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
