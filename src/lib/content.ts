import siteData from "@/content/site.json";
import navigationData from "@/content/navigation.json";
import heroData from "@/content/hero.json";
import whyOmanData from "@/content/why-oman.json";
import processData from "@/content/process.json";
import contactData from "@/content/contact.json";
import servicesData from "@/content/services.json";
import faqData from "@/content/faq.json";
import postsData from "@/content/posts.json";

export const getSiteInfo = () => siteData;
export const getNavigationContent = () => navigationData;
export const getHeroContent = () => heroData;
export const getWhyOmanContent = () => whyOmanData;
export const getProcessContent = () => processData;
export const getContactContent = () => contactData;
export const getServicesContent = () => servicesData;
export const getFaqContent = () => faqData;
export const getPostsContent = () => postsData;

export const getServiceBySlug = (slug: string) =>
  servicesData.items.find((item) => item.slug === slug) ?? null;

export const getPostBySlug = (slug: string) =>
  postsData.find((item) => item.slug === slug) ?? null;
