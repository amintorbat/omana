import siteData from "@/content/site.json";
import navigationData from "@/content/navigation.json";
import heroData from "@/content/hero.json";
import servicesData from "@/content/services.json";
import whyOmanData from "@/content/why-oman.json";
import processData from "@/content/process.json";
import faqData from "@/content/faq.json";
import contactData from "@/content/contact.json";

export const getSiteInfo = () => siteData;
export const getNavigationContent = () => navigationData;
export const getHeroContent = () => heroData;
export const getServicesContent = () => servicesData;
export const getWhyOmanContent = () => whyOmanData;
export const getProcessContent = () => processData;
export const getFaqContent = () => faqData;
export const getContactContent = () => contactData;
