import { useState } from "react";
import { Toaster } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MarqueeBar } from "@/components/MarqueeBar";

const CALENDLY_URL = ""; // optional Calendly URL; empty falls back to contact scroll
const CONTACT_EMAIL = "harshitmadeit@gmail.com";
const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBookCall = () => {
    if (CALENDLY_URL) {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    } else {
      scrollToContact();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-blue-600/40">
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0A0A0A",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#F4F4F5",
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />

      <Navigation onBookCall={handleBookCall} />

      <main>
        <Hero onBookCall={handleBookCall} onViewWork={scrollToWork} />
        <MarqueeBar />
        <FeaturedProjects onOpenCase={setActiveProject} />
        <About />
        <Services />
        <Process />
        <Contact
          onBookCall={handleBookCall}
          email={CONTACT_EMAIL}
          socials={SOCIALS}
        />
      </main>

      <Footer email={CONTACT_EMAIL} socials={SOCIALS} />

      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onBookCall={handleBookCall}
      />
    </div>
  );
}
