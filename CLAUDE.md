# GAMMHA Website — Claude Development Guide

## Project Overview
This project is to design and develop a professional, modern, mobile-first website for:

Gambia Alliance for Maternal Mental Health & Advocacy (GAMMHA)

The website will serve as:
- Awareness platform
- Support gateway
- Advocacy hub
- Donation platform

---

## Skills Directory

All skills are installed in:

/gammha/skills

Claude MUST actively reference and use these skills during development.

---

## Installed Skills

### 🎨 Design & UX
- creative-design/frontend-design
- creative-design/ui-ux-pro-max
- creative-design/mobile-design

### ⚙️ Development & Architecture
- web-development/react-best-practices
- development/senior-architect

### 💳 Payments
- development/stripe-integration

### 🧪 Code Quality (HOOK — ALWAYS ACTIVE)
- development-tools/nextjs-code-quality-enforcer

---

## CRITICAL RULE: Skill Usage

Claude MUST:

- Select the appropriate skill BEFORE implementing any feature
- Use design skills for UI decisions
- Use architecture skills for structure and logic
- Use stripe skill ONLY for donation preparation
- Respect the code-quality-enforcer hook at ALL TIMES

Failure to follow this results in poor architecture.

---

## Tech Stack

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Icons: Lucide
- Deployment: Vercel

---

## Development Philosophy

- Mobile-first design ALWAYS
- Clean, minimal UI
- Reusable components
- Scalable architecture
- Avoid overengineering
- Prioritize clarity over complexity

---

## Website Structure

### Pages

1. Home (/)
2. About (/about)
3. Mental Health (/mental-health)
4. Support (/support)
5. Advocacy (/advocacy)
6. Resources (/resources)
7. Donate (/donate)
8. Contact (/contact)

---

## Page-Level Skill Mapping

### Home Page
Skills:
- frontend-design
- ui-ux-pro-max

Focus:
- Hero section
- Strong CTAs (Get Help, Donate)
- Clean layout

---

### About Page
Skills:
- frontend-design

Focus:
- Trust building
- Clear storytelling

---

### Mental Health Page
Skills:
- ui-ux-pro-max

Focus:
- Educational clarity
- Simple English

---

### Support Page
Skills:
- mobile-design

Focus:
- Fast access to help
- Mobile usability

---

### Advocacy Page
Skills:
- frontend-design

Focus:
- Campaign visibility
- Engagement

---

### Resources Page
Skills:
- react-best-practices

Focus:
- Reusable listing components

---

### Donate Page (HIGH PRIORITY)

Skills:
- stripe-integration
- ui-ux-pro-max

Rules:
- Build donation UI ONLY
- Include:
  - Suggested amounts
  - Custom input
  - Mobile-friendly layout
- DO NOT implement real payment processing
- Prepare for future Stripe integration

---

### Contact Page
Skills:
- mobile-design

Focus:
- Simple and accessible form

---

## Component Requirements

Claude MUST build reusable components:

- Navbar
- Footer
- Buttons (variants)
- Cards
- Forms
- Sections (Hero, CTA, etc.)

---

## UX Requirements

- Clear navigation
- Large readable fonts
- High contrast
- Minimal clutter
- Strong call-to-actions
- Fast loading

---

## Content Guidelines

- Use simple English
- Avoid complex medical terms
- Be empathetic and supportive
- Focus on clarity

---

## Accessibility Rules

- Mobile responsiveness
- Touch-friendly UI
- Readable typography
- Proper spacing

---

## Code Quality Enforcement

The following hook is ALWAYS ACTIVE:

development-tools/nextjs-code-quality-enforcer

Claude MUST:
- Follow clean code practices
- Use proper file structure
- Avoid duplication
- Maintain readability
- Follow Next.js best practices

---

## Architecture Rules

- Use App Router structure
- Separate UI and logic
- Use reusable components
- Keep components small and focused
- Avoid unnecessary state

---

## Execution Plan

Claude should follow this order:

1. Define design system (colors, typography, spacing)
2. Create layout structure
3. Build core reusable components
4. Implement pages
5. Refine UI/UX

---

## Future Scope (DO NOT IMPLEMENT NOW)

- Admin dashboard
- Blog system
- Authentication
- Full payment integration
- Newsletter system

---

## Final Instructions

Claude MUST:

- Think like a senior architect before coding
- Use the correct skill for each task
- Maintain consistency across all pages
- Keep UI clean and professional
- Respect the code quality hook at all times
