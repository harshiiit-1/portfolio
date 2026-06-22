import { motion } from "framer-motion";
import { SectionHeader } from "@/components/FeaturedProjects";

const steps = [
  {
    label: "Discovery",
    summary: "Strategy call, brand audit, success metrics.",
    detail:
      "A focused kickoff to align on audience, product story and what 'done' looks like — before a single frame is animated.",
  },
  {
    label: "Concept",
    summary: "Story beats, references, motion direction.",
    detail:
      "Narrative arc and visual references locked. You'll see exactly where the piece is heading before design begins.",
  },
  {
    label: "Design",
    summary: "Storyboards, frames, type, color.",
    detail:
      "Pixel-tight design frames at full resolution, ready to animate. This is where the look gets finalised.",
  },
  {
    label: "Animation",
    summary: "Motion, easing, rhythm, polish.",
    detail:
      "Custom easing, beat-matched timing, and a polish pass that sweats the last 10% most teams skip.",
  },
  {
    label: "Delivery",
    summary: "Renders, formats, handover.",
    detail:
      "Every aspect ratio you need — landing page, paid social, in-product loops — handed over with source files.",
  },
];

export const Process = () => {
  return (
    <section
      data-testid="process-section"
      id="process"
      className="relative py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Process"
          title="A calm, predictable workflow — even on tight deadlines."
          description="Five stages, clear deliverables at each. No mystery, no scope drift."
        />

        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-9 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3">
            {steps.map((step, idx) => (
              <motion.div
                key={step.label}
                data-testid={`process-step-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <span className="relative h-[18px] w-[18px] rounded-full border border-white/20 bg-[#050505] flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                  </span>
                  <span className="font-mono text-xs text-white/45">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-heading mt-6 text-xl tracking-tight font-medium">
                  {step.label}
                </h3>
                <p className="text-sm text-white/55 mt-2">{step.summary}</p>
                <p className="text-xs text-white/35 mt-4 leading-relaxed">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
