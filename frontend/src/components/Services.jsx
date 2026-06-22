import { motion } from "framer-motion";
import {
  Sparkles,
  MousePointerClick,
  PlaySquare,
  Layers,
  Rocket,
} from "lucide-react";
import { SectionHeader } from "@/components/FeaturedProjects";

const services = [
  {
    icon: Sparkles,
    title: "SaaS Motion Design",
    description:
      "Hero animations, paid social spots and product moments that make your SaaS feel premium from frame one.",
  },
  {
    icon: MousePointerClick,
    title: "UI Motion Design",
    description:
      "Micro-interactions, transitions and onboarding animations that make your product feel alive in the hands of users.",
  },
  {
    icon: PlaySquare,
    title: "Product Explainer Videos",
    description:
      "30–90 second explainers that walk a curious visitor from confused to convinced — without skipping a beat.",
  },
  {
    icon: Layers,
    title: "Brand Motion Systems",
    description:
      "A consistent motion language — logo behaviors, transitions, easing — that scales with your team and design system.",
  },
  {
    icon: Rocket,
    title: "Product Launch Animations",
    description:
      "Launch reels, teaser films and announcement spots designed to land on Twitter, ProductHunt and your homepage.",
  },
];

export const Services = () => {
  return (
    <section
      data-testid="services-section"
      id="services"
      className="relative py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Services"
          title="Five focused offerings, all built for SaaS."
          description="No generalist menu. Just the motion deliverables that move the needle for product-led companies."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} {...service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    data-testid={`service-card-${index}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    className="group relative rounded-2xl border border-white/5 bg-[#0A0A0A] p-7 md:p-8 hover:border-white/15 transition-colors duration-500 overflow-hidden"
  >
    <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.18),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        <Icon size={18} className="text-white/85" />
      </span>
      <h3 className="font-heading mt-7 text-xl tracking-tight font-medium">
        {title}
      </h3>
      <p className="mt-3 text-sm text-white/55 leading-relaxed">{description}</p>
      <div className="mt-7 text-[10px] uppercase tracking-[0.24em] text-white/30">
        0{index + 1}
      </div>
    </div>
  </motion.div>
);
