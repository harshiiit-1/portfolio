export const Footer = ({ email, socials }) => {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/5 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div className="font-heading text-2xl md:text-3xl tracking-tight font-medium leading-tight max-w-xl">
              Motion design for startups that need attention.
            </div>
            <a
              href={`mailto:${email}`}
              className="inline-block mt-5 text-sm text-white/55 hover:text-white transition-colors"
            >
              {email}
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.24em] text-white/45 hover:text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/35">
          <span>© {year} Harshit MadeIt. All rights reserved.</span>
          <span>Designed & animated by Harshit.</span>
        </div>
      </div>
    </footer>
  );
};
