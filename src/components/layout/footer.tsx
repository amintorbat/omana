import Link from "next/link";

import { getNavigationContent, getContactContent, getSiteInfo } from "@/lib/content";

const navigation = getNavigationContent();
const contact = getContactContent();
const site = getSiteInfo();

export const Footer = () => {
  return (
    <footer className="border-t border-white/60 bg-white/90">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-black text-oman-slate">{site.brand.name}</p>
          <p className="mt-2 text-sm text-oman-slate/70">{site.footer.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-oman-slate/70">
          {navigation.links.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-oman-green">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-oman-slate/70">
          <p>واتساپ: +{contact.whatsapp}</p>
          <p className="mt-1">{contact.email}</p>
        </div>
      </div>
      <div className="border-t border-white/60 bg-white/80 text-center text-xs text-oman-slate/60 py-3">
        © {new Date().getFullYear()} {site.brand.name}. {site.footer.rights}
      </div>
    </footer>
  );
};
