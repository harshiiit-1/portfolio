# Harshit MadeIt — Motion Designer Portfolio

## Original Problem Statement
Premium portfolio website for "Harshit MadeIt", a motion designer for startups & SaaS. Apple/Linear-inspired minimalist aesthetic: black background, white typography, subtle electric blue accents. Goal: generate discovery calls from startup founders, agencies, and tech companies.

## Architecture
- **Frontend**: React 19 + CRA (craco) + TailwindCSS + framer-motion + lucide-react + sonner (toasts) — single-page app
- **Backend**: FastAPI + Motor (async MongoDB) — single `/api/contact` endpoint group
- **Database**: MongoDB — `contacts` collection
- **No auth, no third-party LLM integrations** for v1

## User Personas
1. **Startup Founder** — needs SaaS product motion design, evaluates portfolio in <30s
2. **Agency / Design Lead** — looks for case-study depth and process clarity
3. **Tech / DevTools Marketer** — needs explainer videos and launch animations

## Core Requirements (static)
- Hero with headline, dual CTA (Book a Call / View Work)
- 3 featured projects with case-study modals (Overview, Objective, Storyboard, Design Frames, Motion Process, Final Video, Key Learnings)
- About, Services (5), Process (5), Contact form + Calendly CTA + socials
- Premium first impression in <5s
- Responsive, smooth scroll, elegant hover states

## What's Been Implemented (2026-06-22)
- ✅ Sticky glass navigation with section anchors and Book-a-Call CTA
- ✅ Hero: large Outfit typography, dual CTA, animated grid backdrop, trust stats line, scroll-triggered Book-a-Call (Calendly URL pluggable; currently scrolls to contact)
- ✅ Marquee bar (kinetic typography)
- ✅ Featured Projects bento grid (3 cards) with "Video Coming Soon" overlays
- ✅ Case Study Modal — 7 structured sections, backdrop/ESC/close-button dismissal, in-modal Book-a-Call
- ✅ About section with portrait
- ✅ Services bento (5 cards, lucide icons)
- ✅ Process timeline (5 steps) with horizontal connector
- ✅ Contact section: form posts to `POST /api/contact` (saves to MongoDB), Calendly card, mailto card, social links
- ✅ Footer with email + socials
- ✅ Sonner toast system, smooth scroll, custom selection color, Outfit + Manrope fonts
- ✅ Backend: `POST /api/contact`, `GET /api/contact`, `GET /api/`
- ✅ Backend test suite at `/app/backend/tests/backend_test.py` (11/11 passing)
- ✅ Frontend dev-server compatibility patch in `craco.config.js` (WDS v4→v5 API migration)

## Prioritized Backlog
### P0 — Blocking nothing right now
- (none)

### P1 — Should add when Harshit provides assets
- Real video embeds for the three featured projects (currently "Coming Soon")
- Calendly URL — drop into `CALENDLY_URL` constant in `/app/frontend/src/pages/Portfolio.jsx`
- Real social profile URLs (currently placeholder)
- Real headshot for About section

### P2 — Growth / polish
- Email notification on contact lead (Resend integration — needs API key)
- Admin-only lightweight view of contact leads at `/admin/leads`
- SEO meta + OpenGraph card + favicon set
- Blog / case-study standalone routes for SEO discoverability
- Testimonials section once Harshit has client quotes

## Next Tasks
1. Drop in Calendly URL when available
2. Replace project thumbnails with actual video reels (MP4 or Vimeo embeds)
3. Add real social handle URLs
4. (Optional) Wire up email notifications via Resend for new contact leads
