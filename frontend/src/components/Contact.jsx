import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowUpRight, Mail, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initialForm = {
  name: "",
  email: "",
  company: "",
  project_type: "",
  budget: "",
  message: "",
};

export const Contact = ({ onBookCall, email, socials }) => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        company: form.company || null,
        project_type: form.project_type || null,
        budget: form.budget || null,
      };
      await axios.post(`${API}/contact`, payload);
      setSubmitted(true);
      setForm(initialForm);
      toast.success("Message sent. I'll be in touch within 24 hours.");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.detail || "Couldn't send right now. Try again in a moment.";
      toast.error(typeof msg === "string" ? msg : "Couldn't send right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      data-testid="contact-section"
      id="contact"
      className="relative py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
              <span className="h-px w-8 bg-white/20" />
              Contact
            </div>
            <h2 className="font-heading mt-5 text-3xl sm:text-4xl md:text-5xl tracking-[-0.025em] leading-[1.05] font-medium">
              Let&apos;s give your product the motion it deserves.
            </h2>
            <p className="mt-6 text-white/55 text-base md:text-[17px] leading-relaxed max-w-md">
              Tell me about your project. I&apos;ll reply within one business day with
              next steps or a calendar link to chat.
            </p>

            <div className="mt-10 space-y-4">
              <button
                data-testid="contact-book-call-btn"
                onClick={onBookCall}
                className="group w-full sm:w-auto inline-flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#0A0A0A] hover:border-white/25 transition-colors duration-300 px-6 py-5 text-left"
              >
                <span className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Calendar size={16} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">
                      Book a Discovery Call
                    </span>
                    <span className="block text-xs text-white/45 mt-0.5">
                      30 minutes · Free · Calendly
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <a
                data-testid="contact-email-link"
                href={`mailto:${email}`}
                className="group w-full sm:w-auto inline-flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#0A0A0A] hover:border-white/25 transition-colors duration-300 px-6 py-5"
              >
                <span className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Mail size={16} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{email}</span>
                    <span className="block text-xs text-white/45 mt-0.5">
                      Or write directly
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  data-testid={`social-link-${s.label.toLowerCase()}`}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.24em] text-white/45 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            data-testid="contact-form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-3xl border border-white/8 bg-[#0A0A0A] p-7 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.18),transparent)] pointer-events-none" />

            <div className="relative space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Your name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Jane Cooper"
                  required
                  testid="contact-name-input"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="jane@startup.com"
                  required
                  testid="contact-email-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Company"
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Acme SaaS"
                  testid="contact-company-input"
                />
                <SelectField
                  label="Project type"
                  value={form.project_type}
                  onChange={update("project_type")}
                  testid="contact-project-type-select"
                  options={[
                    { value: "", label: "Select..." },
                    { value: "saas-ad", label: "SaaS Ad / Spec" },
                    { value: "ui-motion", label: "UI Motion Design" },
                    { value: "explainer", label: "Product Explainer" },
                    { value: "brand-system", label: "Brand Motion System" },
                    { value: "launch", label: "Product Launch" },
                    { value: "other", label: "Something else" },
                  ]}
                />
              </div>

              <SelectField
                label="Budget"
                value={form.budget}
                onChange={update("budget")}
                testid="contact-budget-select"
                options={[
                  { value: "", label: "Select..." },
                  { value: "<5k", label: "Under $5k" },
                  { value: "5-10k", label: "$5k – $10k" },
                  { value: "10-25k", label: "$10k – $25k" },
                  { value: "25k+", label: "$25k+" },
                ]}
              />

              <TextAreaField
                label="Tell me about the project"
                value={form.message}
                onChange={update("message")}
                placeholder="What are you building, what's the goal, and when do you need it?"
                required
                testid="contact-message-input"
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <p className="text-xs text-white/40 max-w-sm">
                  By submitting, you agree to be contacted about your project.
                  No spam, no list — just a real reply.
                </p>
                <button
                  type="submit"
                  data-testid="contact-submit-btn"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 px-7 py-3.5 text-sm font-medium min-w-[180px] justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : submitted ? (
                    <>Sent — thank you</>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, testid, ...props }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-[0.24em] text-white/40 mb-2">
      {label}
    </span>
    <input
      data-testid={testid}
      {...props}
      className="w-full bg-transparent border-b border-white/10 focus:border-white/40 text-white placeholder-white/25 py-3 text-sm md:text-base outline-none transition-colors"
    />
  </label>
);

const SelectField = ({ label, testid, options, ...props }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-[0.24em] text-white/40 mb-2">
      {label}
    </span>
    <div className="relative">
      <select
        data-testid={testid}
        {...props}
        className="w-full appearance-none bg-transparent border-b border-white/10 focus:border-white/40 text-white py-3 text-sm md:text-base outline-none transition-colors pr-8"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#0A0A0A]">
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-white/40 text-xs">
        ▾
      </span>
    </div>
  </label>
);

const TextAreaField = ({ label, testid, ...props }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-[0.24em] text-white/40 mb-2">
      {label}
    </span>
    <textarea
      data-testid={testid}
      rows={5}
      {...props}
      className="w-full bg-transparent border-b border-white/10 focus:border-white/40 text-white placeholder-white/25 py-3 text-sm md:text-base outline-none resize-none transition-colors"
    />
  </label>
);
