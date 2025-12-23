import Link from "next/link";

import { getNavigationContent, getSiteInfo } from "@/lib/content";

const navigation = getNavigationContent();
const site = getSiteInfo();

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-black text-text">
            {site.brand.name}
          </p>
          <p className="mt-2 text-sm text-muted">
            {site.footer.tagline}
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-muted">
          {navigation.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border/60 bg-background py-3 text-center text-xs text-muted/70">
        <p>
          © {new Date().getFullYear()} {site.brand.name}. {site.footer.rights}
        </p>
        <p className="mt-1 text-[11px] text-muted/60">
          Design &amp; Development by{" "}
          <a
            href="https://torbatesfahaniagency.ir/"
            target="_blank"
            rel="noreferrer"
            className="text-muted/70 hover:text-primary"
          >
            Torbate Esfahani Agency
          </a>
        </p>
      </div>
    </footer>
  );
};
