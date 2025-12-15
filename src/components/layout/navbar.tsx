"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getNavigationContent, getSiteInfo } from "@/lib/content";
import { cn } from "@/lib/utils";

const site = getSiteInfo();
const navigation = getNavigationContent();

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-white/60">
      <div className="container flex items-center justify-between py-4">
        <Link href="#hero" className="text-lg font-black tracking-tight text-oman-slate">
          {site.brand.name}
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-oman-slate/80 transition hover:text-oman-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild className="px-8 py-3">
            <Link href={navigation.cta.href}>{navigation.cta.label}</Link>
          </Button>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-full border border-oman-slate/10 p-2 text-oman-slate/80 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="باز کردن منو"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div
        className={cn(
          "lg:hidden bg-white transition grid overflow-hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden px-6 pb-6 pt-0">
          <nav className="flex flex-col gap-4">
            {navigation.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-oman-slate/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <Link href={navigation.cta.href}>{navigation.cta.label}</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
