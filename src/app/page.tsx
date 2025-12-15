import { Contact } from "@/components/sections/contact";
import { FAQ } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhyOman } from "@/components/sections/why-oman";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Services />
      <WhyOman />
      <Process />
      <FAQ />
      <Contact />
    </main>
  );
}
