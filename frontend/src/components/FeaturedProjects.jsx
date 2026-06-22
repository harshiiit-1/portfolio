import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Play } from "lucide-react";
import { projects } from "@/data/projects";

export const FeaturedProjects = ({ onOpenCase }) => {
  return (
    <section
      data-testid="work-section"
      id="work"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Selected Work"
          title="Three films. One obsession with motion."
          description="Each project is a study in how startups and modern brands can use animation to communicate value, not decoration."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpen={() => onOpenCase(project)}
              span={idx === 0 ? "lg:col-span-7" : idx === 1 ? "lg:col-span-5" : "lg:col-span-12"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, onOpen, span }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.article
      data-testid={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-900/5 bg-zinc-50 hover-lift hover:border-zinc-900/15 ${span}`}
    >
      {/* Video / thumbnail area — click to play inline */}
      <div className="relative aspect-video overflow-hidden">
        {playing ? (
          <iframe
            data-testid={`project-player-${project.id}`}
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            className="absolute left-1/2 top-1/2 h-[103%] w-[103%] -translate-x-1/2 -translate-y-1/2 border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            data-testid={`project-play-${project.id}`}
            aria-label={`Play ${project.title}`}
            className="absolute inset-0 h-full w-full group/play"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/play:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/55 via-zinc-900/15 to-transparent" />

            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className="relative inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-[0_8px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover/play:scale-110"
              >
                <Play size={22} className="ml-1" fill="currentColor" />
                <span
                  className="absolute inset-0 rounded-full border border-white/60 animate-ping opacity-60"
                  style={{ animationDuration: "2.4s" }}
                />
              </span>
            </span>

            {/* Duration */}
            <span className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-900/10 px-3 py-1.5 text-[11px] text-zinc-900/85 shadow-sm">
              <Clock size={11} />
              {project.duration}
            </span>

            {/* Tags row */}
            <span className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/85 backdrop-blur-md border border-white/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-900/80"
                >
                  {t}
                </span>
              ))}
            </span>
          </button>
        )}
      </div>

      {/* Meta + View Project — separate clickable opens modal */}
      <button
        onClick={onOpen}
        data-testid={`project-open-${project.id}`}
        className="block w-full text-left p-7 md:p-8 group/meta"
      >
        <div className="flex flex-col gap-5">
          <h3 className="font-heading text-2xl md:text-3xl tracking-tight font-medium">
            {project.title}
          </h3>
          <p className="text-zinc-900/55 text-sm md:text-base leading-relaxed max-w-xl">
            {project.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="inline-flex items-center gap-2 text-sm text-zinc-900/80 group-hover/meta:text-zinc-900 transition-colors">
              View Project
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover/meta:translate-x-0.5 group-hover/meta:-translate-y-0.5"
              />
            </span>
            <span className="text-xs text-zinc-900/30">
              0{index + 1} / 0{projects.length}
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
};

export const SectionHeader = ({ eyebrow, title, description, align = "left" }) => (
  <div
    className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
  >
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-zinc-900/45">
      <span className="h-px w-8 bg-zinc-900/20" />
      {eyebrow}
    </div>
    <h2 className="font-heading mt-5 text-3xl sm:text-4xl md:text-5xl tracking-[-0.025em] font-medium leading-[1.05]">
      {title}
    </h2>
    {description && (
      <p className="mt-5 text-zinc-900/55 text-base md:text-[17px] leading-relaxed max-w-2xl">
        {description}
      </p>
    )}
  </div>
);
