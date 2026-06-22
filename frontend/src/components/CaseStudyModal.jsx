import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play, Clock, ArrowUpRight } from "lucide-react";

export const CaseStudyModal = ({ project, onClose, onBookCall }) => {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          data-testid="case-study-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-start md:items-center justify-center p-3 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl my-4 bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              data-testid="case-study-close-btn"
              onClick={onClose}
              className="absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-black/60 border border-white/10 hover:border-white/30 hover:bg-black/80 flex items-center justify-center transition-all"
              aria-label="Close case study"
            >
              <X size={16} />
            </button>

            {/* Hero of modal */}
            <div className="relative aspect-[16/9] md:aspect-[16/7] overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
              <div className="absolute inset-0 grid-overlay opacity-30 mix-blend-overlay" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/55">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur px-3 py-1">
                    <Clock size={11} /> {project.duration}
                  </span>
                  <span>{project.tag}</span>
                </div>
                <h2
                  data-testid="case-study-title"
                  className="font-heading mt-4 text-3xl md:text-5xl tracking-[-0.02em] font-medium"
                >
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="px-6 md:px-12 py-12 md:py-16 space-y-14">
              <Section eyebrow="01 — Overview" title="What this project is">
                <p>{project.caseStudy.overview}</p>
              </Section>

              <Section eyebrow="02 — Objective" title="Why it exists">
                <p>{project.caseStudy.objective}</p>
              </Section>

              <Section eyebrow="03 — Storyboard" title="Beat by beat">
                <ol className="space-y-3">
                  {project.caseStudy.storyboard.map((s, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-white/65 text-base leading-relaxed"
                    >
                      <span className="text-[#3B82F6] font-mono text-sm pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section eyebrow="04 — Design Frames" title="Key visual moments">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.caseStudy.designFrames.map((frame, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/8 bg-[#111111] aspect-[16/10] flex flex-col items-start justify-end p-5 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 grid-overlay opacity-30" />
                      <div
                        className="absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-25 blur-3xl"
                        style={{ background: project.accent }}
                      />
                      <span className="relative text-[10px] uppercase tracking-[0.22em] text-white/45">
                        Frame {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="relative mt-1 text-sm text-white/80">
                        {frame}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section eyebrow="05 — Motion Process" title="How it was animated">
                <p>{project.caseStudy.motionProcess}</p>
              </Section>

              <Section eyebrow="06 — Final Video" title="The piece in motion">
                <div className="relative rounded-2xl overflow-hidden border border-white/8 aspect-video bg-[#0E0E10] flex items-center justify-center">
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                  <div className="relative flex flex-col items-center gap-4 text-center px-6">
                    <span
                      className="h-16 w-16 rounded-full border border-white/15 flex items-center justify-center bg-black/60"
                      style={{ boxShadow: `0 0 60px ${project.accent}40` }}
                    >
                      <Play size={20} className="text-white/80 ml-0.5" />
                    </span>
                    <p className="font-heading text-xl tracking-tight">
                      Video coming soon
                    </p>
                    <p className="text-sm text-white/45 max-w-md">
                      The final render is being prepared. Want a preview right now?
                      Book a discovery call and I&apos;ll walk you through it live.
                    </p>
                  </div>
                </div>
              </Section>

              <Section eyebrow="07 — Key Learnings" title="What this project taught me">
                <p>{project.caseStudy.keyLearnings}</p>
              </Section>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/5">
                <div className="max-w-md">
                  <p className="font-heading text-xl tracking-tight">
                    Have a similar project in mind?
                  </p>
                  <p className="text-sm text-white/50 mt-1">
                    Let&apos;s talk about how motion can carry your product story.
                  </p>
                </div>
                <button
                  data-testid="case-study-book-call-btn"
                  onClick={() => {
                    onClose();
                    onBookCall();
                  }}
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-white/90 transition-colors px-6 py-3 text-sm font-medium"
                >
                  Book a Discovery Call
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Section = ({ eyebrow, title, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
    <div className="md:col-span-4">
      <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
        {eyebrow}
      </div>
      <h3 className="font-heading mt-3 text-2xl tracking-tight font-medium">
        {title}
      </h3>
    </div>
    <div className="md:col-span-8 text-white/65 text-base leading-relaxed">
      {children}
    </div>
  </div>
);
