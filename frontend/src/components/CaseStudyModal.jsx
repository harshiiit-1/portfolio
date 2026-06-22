import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, ArrowUpRight } from "lucide-react";

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
          className="fixed inset-0 z-[100] bg-zinc-900/55 backdrop-blur-md flex items-start md:items-center justify-center p-3 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl my-4 bg-white border border-zinc-900/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              data-testid="case-study-close-btn"
              onClick={onClose}
              className="absolute top-5 right-5 z-30 h-10 w-10 rounded-full bg-white/95 border border-zinc-900/10 hover:border-zinc-900/30 hover:bg-white text-zinc-900 flex items-center justify-center transition-all shadow-sm"
              aria-label="Close case study"
            >
              <X size={16} />
            </button>

            {/* Vimeo player — cinematic hero, edge-to-edge */}
            <div className="relative aspect-video overflow-hidden">
              <iframe
                data-testid="case-study-player"
                src={`https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
                title={project.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                className="absolute left-1/2 top-1/2 h-[103%] w-[103%] -translate-x-1/2 -translate-y-1/2 border-0"
              />
            </div>

            {/* Title strip */}
            <div className="px-6 md:px-12 pt-10 md:pt-14">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-zinc-900/55">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-900/12 bg-zinc-50 px-3 py-1">
                  <Clock size={11} /> {project.duration}
                </span>
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-900/10 bg-zinc-50 px-3 py-1 text-zinc-900/65 normal-case tracking-normal text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h2
                data-testid="case-study-title"
                className="font-heading mt-6 text-3xl md:text-5xl lg:text-6xl tracking-[-0.025em] font-medium leading-[1.05]"
              >
                {project.title}
              </h2>

              <p className="mt-6 max-w-2xl text-zinc-900/65 text-base md:text-[17px] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="px-6 md:px-12 py-12 md:py-16 space-y-14">
              <Section eyebrow="01 — Overview" title="About this project">
                <p>{project.overview}</p>
              </Section>

              <Section eyebrow="02 — Takeaway" title="What I learned making it">
                <p>{project.keyLearnings}</p>
              </Section>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-zinc-900/5">
                <div className="max-w-md">
                  <p className="font-heading text-xl tracking-tight">
                    Want something like this for your product?
                  </p>
                  <p className="text-sm text-zinc-900/55 mt-1">
                    Let&apos;s talk about how motion can carry your story.
                  </p>
                </div>
                <button
                  data-testid="case-study-book-call-btn"
                  onClick={() => {
                    onClose();
                    onBookCall();
                  }}
                  className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors px-6 py-3 text-sm font-medium"
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
      <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-900/40">
        {eyebrow}
      </div>
      <h3 className="font-heading mt-3 text-2xl tracking-tight font-medium">
        {title}
      </h3>
    </div>
    <div className="md:col-span-8 text-zinc-900/65 text-base leading-relaxed">
      {children}
    </div>
  </div>
);
