import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LOGO_URL } from "@/data/brand";

const links = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const Navigation = ({ onBookCall }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      data-testid="site-nav"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-zinc-900/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 font-heading text-[15px] tracking-tight font-medium text-zinc-900"
        >
          <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 ring-1 ring-zinc-900/10">
            <img
              src={LOGO_URL}
              alt="Harshit MadeIt logo"
              className="h-full w-full object-cover scale-[1.55] select-none"
              draggable={false}
            />
          </span>
          <span className="flex items-center leading-none">
            Harshit<span className="text-[#3B82F6]">.</span>
            <span className="text-zinc-900/50 font-normal ml-1">MadeIt</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <button
              key={link.id}
              data-testid={`nav-link-${link.id}`}
              onClick={() => scrollTo(link.id)}
              className="text-[13px] text-zinc-900/60 hover:text-zinc-900 transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          data-testid="nav-book-call-btn"
          onClick={onBookCall}
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-300 px-5 py-2 text-[13px] font-medium"
        >
          Book a Call
          <span aria-hidden="true">→</span>
        </button>

        <button
          data-testid="nav-mobile-book-btn"
          onClick={onBookCall}
          className="md:hidden rounded-full bg-zinc-900 text-white px-4 py-2 text-xs font-medium"
        >
          Book
        </button>
      </div>
    </motion.header>
  );
};
