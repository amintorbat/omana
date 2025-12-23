import { Contact } from "@/components/sections/contact";
import { FAQ } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhyOman } from "@/components/sections/why-oman";
import {
  fetchFaqs,
  fetchServices,
  fetchSiteSettings,
} from "@/lib/cms-client";
import { getContactContent, getFaqContent, getServicesContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [servicesData, faqData, siteSettings] = await Promise.all([
    fetchServices(),
    fetchFaqs(),
    fetchSiteSettings(),
  ]);
  const contactContent = getContactContent();
  const servicesContent = getServicesContent();
  const faqContent = getFaqContent();
  const servicesItems =
    servicesData.items.length > 0 ? servicesData.items : servicesContent.items;
  const faqItems = faqData.items.length > 0 ? faqData.items : faqContent.items;

  return (
    <main className="flex flex-col">
      <Hero
        heroTitle={siteSettings.heroTitle}
        heroSubtitle={siteSettings.heroSubtitle}
      />
      <Services items={servicesItems} heading={servicesContent.heading} />
      <WhyOman />
      <Process />
      <FAQ items={faqItems} heading={faqContent.heading} />
      <Contact
        content={contactContent}
        settings={siteSettings}
      />
    </main>
  );
}
