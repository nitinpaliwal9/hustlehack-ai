This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

{
  "brand": {
    "name": "HustleHack AI",
    "tone": "Gen Z, practical, no-fluff, hybrid Hindi-English where needed",
    "mission": "Empower students, creators, and entrepreneurs to hustle smarter using AI-powered tools, systems, templates, and content packs",
    "style": "Modern, AI-native, productivity-driven, friendly but sharp",
    "color": {
      "--primary": "#7F5AF0",
      "--accent": "#00FFC2"
    },
    "audience": "18-25 year old Indian students, creators, founders, side-hustlers"
  },
  "tech_stack": {
    "frontend": "Next.js 15+ with App Router",
    "styling": "Tailwind CSS with custom brand colors",
    "auth": "Supabase Auth",
    "db": "Supabase Postgres (RLS enabled)",
    "cms_logic": "Markdown, JSON-based dynamic mapping, Notion-backed knowledge templates",
    "hosting": "Vercel"
  },
  "content_rules": {
    "tone": "Write in Gen Z-friendly, action-driven tone. Avoid corporate speak. Use hooks, emojis, and relatable phrasing.",
    "layout": {
      "cards": "Use responsive 3-column layout with 1-column fallback on mobile. Cards should have title, badge (Free/Pro), 1-liner description, CTA button text, and link.",
      "spacing": "Use Tailwind: p-6 for cards, space-y-6 for vertical separation, rounded-xl for soft corners, shadow-xl for elevation.",
      "containers": "Use max-w-5xl or max-w-7xl centered inside min-h-screen section."
    },
    "code_expectations": {
      "framework": "React using Next.js App Router",
      "file_structure": "Output pages under /app/**/page.js. Components reusable under /components/",
      "api_handling": "Use Supabase SDK with async/await. Use guards like `if (!user?.id) return` before fetch.",
      "auth_state": "Use `useAuth()` or `supabase.auth.getUser()` pattern. Never fetch user profile blindly.",
      "error_handling": "Use `console.error`, `toast.error`, and fallback UI components."
    }
  },
  "reusable_patterns": {
    "resource_card": {
      "fields": ["title", "description", "badge", "ctaText", "ctaLink"],
      "cta_behavior": {
        "Free": "Direct access",
        "Pro": "Link to /pricing or gated route"
      },
      "animation": "Use hover:shadow-2xl and scale-105 on card hover",
      "icons": "Optional emoji or HeroIcon"
    },
    "faq": {
      "component": "Accordion with question + answer",
      "style": "Rounded bg-white with border-l-4 border-[color:var(--primary)]"
    },
    "section_intro": {
      "seo_friendly": true,
      "format": "1-2 lines explaining value of section using creator-friendly keywords"
    }
  },
  "default_ctas": [
    "Try Now →",
    "Unlock Tool →",
    "Use Template →",
    "Start Focus Mode →",
    "Upgrade & Access →"
  ],
  "memory_instructions": {
    "store_structure": "For any new resource/toolkit section, apply the same layout and language rules as above unless told otherwise.",
    "track_requests": "If multiple tools reference the same Pro Plan, group them in a bundle pack.",
    "suggestions": "Always suggest cross-links like: Related Tools, Upgrade Options, or Join WhatsApp Group CTA."
  }
}


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
