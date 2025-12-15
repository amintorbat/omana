"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContactContent } from "@/lib/content";
import { fadeInUp } from "@/lib/motion";

export const Contact = () => {
  const contact = getContactContent();
  const whatsappUrl = `https://wa.me/${contact.whatsapp}`;
  return (
    <section id="contact" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container grid gap-12 md:grid-cols-2">
        <SectionHeading
          title={contact.heading.title}
          description={contact.heading.description}
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
              {contact.availability}
            </p>
            <p className="text-xs text-oman-slate/60">{contact.cta.helper}</p>
            <Button asChild className="w-full px-8 py-4 text-base">
              <Link href={whatsappUrl} target="_blank">
                {contact.cta.label}
              </Link>
            </Button>
            <div className="grid gap-3 text-sm text-oman-slate/80">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-oman-green" size={18} />
                <span>+{contact.whatsapp}</span>
              </div>
              <Link
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-oman-slate/80 hover:text-oman-green"
              >
                <Mail size={18} />
                {contact.email}
              </Link>
              <p className="flex items-center gap-3">
                <MapPin className="text-oman-red" size={18} />
                {contact.address}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
