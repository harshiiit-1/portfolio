import { motion } from "framer-motion";

export const About = () => {
  return (
    <section
      data-testid="about-section"
      id="about"
      className="relative py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/8">
            <img
              src="https://images.unsplash.com/photo-1764546899196-b53061b1b609?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXNpZ25lciUyMHBvcnRyYWl0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzgyMTEyMzI5fDA&ixlib=rb-4.1.0&q=85"
              alt="Harshit MadeIt"
              className="absolute inset-0 h-full w-full object-cover grayscale-[0.15] hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.28em] text-white/70">
              Harshit · Motion Designer
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7"
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
            <span className="h-px w-8 bg-white/20" />
            About
          </div>
          <h2 className="font-heading mt-5 text-3xl sm:text-4xl md:text-5xl tracking-[-0.025em] leading-[1.05] font-medium">
            I make motion that helps modern products feel inevitable.
          </h2>
          <div className="mt-7 space-y-5 text-white/60 text-base md:text-[17px] leading-relaxed max-w-2xl">
            <p>
              I&apos;m Harshit — a motion designer working with startups, SaaS teams
              and modern digital brands. I focus on a narrow problem: turning
              dense product stories into clean, cinematic animation that
              converts attention into action.
            </p>
            <p>
              I work end-to-end. From sitting in your strategy call, to
              storyboards, design frames, and the final render — you get one
              person who owns the motion language of your product instead of a
              fragmented chain of vendors.
            </p>
            <p className="text-white/75">
              The result: motion that feels like a part of the product, not a
              decoration around it.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
            <Detail label="Based in" value="Remote · Worldwide" />
            <Detail label="Stack" value="After Effects · Figma · Cinema 4D" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <div className="text-[10px] uppercase tracking-[0.24em] text-white/40">
      {label}
    </div>
    <div className="mt-1.5 text-sm text-white/85">{value}</div>
  </div>
);
