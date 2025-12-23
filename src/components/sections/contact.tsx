"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeInUp } from "@/lib/motion";

type ContactContent = {
  heading: {
    title: string;
    description: string;
  };
  availability: string;
  address?: string;
  cta: {
    label: string;
    helper: string;
  };
};

type ContactSettings = {
  whatsappE164: string;
  email: string;
  address: string | null;
};

export const Contact = ({
  content,
  settings,
}: {
  content: ContactContent;
  settings: ContactSettings;
}) => {
  const whatsappHandle = settings.whatsappE164.replace("+", "");
  const whatsappLink = whatsappHandle
    ? `https://wa.me/${whatsappHandle}`
    : "#contact";
  const phoneNumber = "+989308829926";
  const emailAddress = "torbatamin@gmail.com";
  const whatsappMessage =
    "سلام، برای دریافت مشاوره از سایت امانا پیام می\u200cدهم.";
  const whatsappUrl = `https://wa.me/989308829926?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section id="contact" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container grid gap-12 md:grid-cols-2">
        <SectionHeading
          title={content.heading.title}
          description={content.heading.description}
        />
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Card glow className="space-y-5">
            <p className="text-sm font-medium text-oman-slate/70">
              {content.availability}
            </p>
            <p className="text-xs text-oman-slate/60">{content.cta.helper}</p>
            <Button asChild className="w-full px-8 py-4 text-base">
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {content.cta.label}
              </Link>
            </Button>
            <div className="grid gap-3 text-sm text-oman-slate/80">
              <Link
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-3 text-oman-slate/80 hover:text-oman-green"
                aria-label={`Call ${phoneNumber}`}
              >
                <Phone className="text-oman-green" size={18} />
                {phoneNumber}
              </Link>
              <Link
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-3 text-oman-slate/80 hover:text-oman-green"
                aria-label={`Email ${emailAddress}`}
              >
                <Mail size={18} />
                {emailAddress}
              </Link>
              {(settings.address || content.address) && (
                <p className="flex items-center gap-3">
                  <MapPin className="text-oman-red" size={18} />
                  {settings.address || content.address}
                </p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
