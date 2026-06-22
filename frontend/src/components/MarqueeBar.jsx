const tokens = [
  "SaaS Ads",
  "Product Explainers",
  "UI Motion",
  "Brand Systems",
  "Launch Films",
  "Spec Work",
  "Onboarding Loops",
];

export const MarqueeBar = () => {
  const items = [...tokens, ...tokens, ...tokens];
  return (
    <section
      data-testid="marquee-bar"
      className="relative border-y border-white/5 py-6 overflow-hidden"
    >
      <div className="flex marquee-track gap-12 whitespace-nowrap">
        {items.map((t, i) => (
          <span
            key={i}
            className="font-heading text-[28px] md:text-[34px] tracking-[-0.02em] text-white/35 flex items-center gap-12"
          >
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
          </span>
        ))}
      </div>
    </section>
  );
};
