import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
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
          title="Three case studies. One obsession with motion."
          description="Each project is a study in how startups and SaaS products can use animation to communicate value, not decoration."
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
  return (
    <motion.article
      data-testid={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A] hover-lift hover:border-white/15 ${span}`}
    >
      <button
        onClick={onOpen}
        className="block w-full text-left"
        data-testid={`project-open-${project.id}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.04] transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

          {/* Coming soon badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Video coming soon
          </div>

          {/* Duration */}
          <div className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[11px] text-white/80">
            <Clock size={11} />
            {project.duration}
          </div>

          {/* Tag */}
          <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.28em] text-white/55">
            {project.tag}
          </div>
        </div>

        <div className="p-7 md:p-8 flex flex-col gap-5">
          <h3 className="font-heading text-2xl md:text-3xl tracking-tight font-medium">
            {project.title}
          </h3>
          <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-xl">
            {project.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
              View Project
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            <span className="text-xs text-white/30">
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
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
      <span className="h-px w-8 bg-white/20" />
      {eyebrow}
    </div>
    <h2 className="font-heading mt-5 text-3xl sm:text-4xl md:text-5xl tracking-[-0.025em] font-medium leading-[1.05]">
      {title}
    </h2>
    {description && (
      <p className="mt-5 text-white/55 text-base md:text-[17px] leading-relaxed max-w-2xl">
        {description}
      </p>
    )}
  </div>
);
