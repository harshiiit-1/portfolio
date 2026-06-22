import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Hero = ({ onBookCall, onViewWork }) => {
  return (
    <section
      data-testid="hero-section"
      className="relative isolate overflow-hidden pt-36 pb-32 md:pt-44 md:pb-40"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 grid-overlay opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-white" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-[420px] w-[820px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.18),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-zinc-900/50"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
          Motion Designer · Startups & SaaS
        </motion.div>

        <motion.h1
          data-testid="hero-headline"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="show"
          className="font-heading mt-8 text-[44px] sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.98] tracking-[-0.035em] font-medium max-w-5xl"
        >
          Motion design for
          <br className="hidden sm:block" /> startups that
          <span className="text-zinc-900/40"> need </span>
          <span className="relative inline-block">
            attention
            <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-transparent" />
          </span>
          .
        </motion.h1>

        <motion.p
          data-testid="hero-subheadline"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-2xl text-zinc-900/60 text-base md:text-lg leading-relaxed"
        >
          I help SaaS products and modern tech brands communicate clearly through
          motion — turning dense product stories into crisp, cinematic animations
          your users actually finish watching.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <button
            data-testid="hero-book-call-btn"
            onClick={onBookCall}
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all duration-300 px-7 py-4 text-sm font-medium"
          >
            Book a Discovery Call
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
          <button
            data-testid="hero-view-work-btn"
            onClick={onViewWork}
            className="group inline-flex items-center gap-2 rounded-full bg-transparent text-zinc-900 border border-zinc-900/15 hover:border-zinc-900/40 transition-colors duration-300 px-7 py-4 text-sm font-medium"
          >
            <Play size={14} className="opacity-80" />
            View Work
          </button>
        </motion.div>
      </div>
    </section>
  );
};
