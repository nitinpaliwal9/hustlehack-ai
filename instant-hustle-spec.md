Instant Hustle Lite – Specification
1. Overview
Instant Hustle Lite is a plug-and-play AI-powered content creation tool under HustleHack AI. It provides ready-to-use social media templates, hooks, captions, and thumbnail ideas for creators, students, and solopreneurs.

The MVP should:

Offer pre-designed templates (e.g., Canva Pro links, thumbnail mockups).

Provide AI-generated hooks & captions (OpenRouter API).

Allow filtering by platform & niche (Instagram, YouTube, LinkedIn).

Include plan gating (Starter = limited access, Pro/Creator = full access).

Deliver a premium, interactive experience.

2. Core Features
Platform Selector: Instagram, YouTube, LinkedIn (Phase 1).

Niche Filters: Fitness, Tech & AI, Education, Gaming, Fashion, etc.

Template Library:

Thumbnail previews (images + Canva links).

Caption & Hook vault (20–50 ideas per niche).

AI Outputs: On-demand generation of 3–5 hooks or captions using OpenRouter.

Plan Gating:

Starter → 3 free outputs/templates only (blurred previews for others).

Creator/Pro → Unlimited access.

CTA Section: Upsell prompt for non-premium users.

3. Tech Stack
Frontend: Next.js (TypeScript) + Tailwind CSS.

Backend: Next.js API routes + Supabase Auth/Plans.

AI Provider: OpenRouter (GPT-4o-mini for cost efficiency).

Content Storage:

Pre-uploaded images (thumbnails, previews) in /public/templates.

Metadata in JSON or Supabase table.

4. File Structure
app/
  instant-hustle/
    page.tsx               // Entry UI page
    components/
      PlatformSelector.tsx
      NicheSelector.tsx
      TemplateGrid.tsx     // Cards for thumbnails/templates
      HookGenerator.tsx    // AI hook/caption generator
      UpgradeModal.tsx     // Plan gating prompt
      HookVault.tsx
  api/
    generate-hooks/route.ts // Endpoint for AI hook generation
    generate-captions/route.ts
public/
  templates/               // Preloaded template preview images
data/
  niches.json              // { platform: "Instagram", niches: [ "Fitness", ... ] }
  hooks.json               // Pre-written hooks for each niche
  captions.json
5. Step-by-Step User Flow
Landing Section → “Choose your platform” (Instagram, YouTube, LinkedIn).

Niche Selection → Drop-down or grid of categories.

Template Display:

Shows 6–10 pre-designed thumbnails/caption templates.

Starter users see only 2 fully visible templates (rest blurred).

Hook Generator:

User clicks “Generate Hooks.”

API route (/api/generate-hooks) generates 3 hooks using pre-built prompt.

Download or Copy:

Pro users can download all templates (link to Canva).

Upgrade CTA:

If user tries premium action (e.g., 4th hook), show upgrade modal.

6. AI Prompt Example
Hooks Prompt Template (for OpenRouter):
"Generate 5 viral hook ideas for {niche} content on {platform}. 
Make them short, attention-grabbing, and trend-friendly."
Captions Prompt Template:
"Create 5 engaging captions for {platform} in {niche} niche with a modern tone, using emojis and CTAs."
7. Milestones
Milestone 1 – Static UI (6 hours)
Build /instant-hustle route.

Add PlatformSelector, NicheSelector, and static TemplateGrid.

Show mock hooks & captions.

Milestone 2 – AI Integration (4–5 hours)
Create generate-hooks and generate-captions endpoints.

Connect them to UI.

Milestone 3 – Plan Gating (3–4 hours)
Starter vs Pro access logic using Supabase user.plan.

Upgrade modal.

Milestone 4 – Polishing & Branding (2–3 hours)
Tailwind styling, branding, mobile responsiveness.

8. Design Requirements
Clean UI with cards for templates (thumbnail previews).

Bright CTA buttons for “Generate” and “Upgrade.”

Responsive layout (mobile-first).

Colors: Use HustleHack AI palette (#7F5AF0 and #00FFC2).

9. Pre-Requisites
Pre-create:

10 thumbnail templates on Canva Pro (save as preview images + links).

50+ hooks & 50+ captions (JSON format).

Supabase plans must already exist (starter, creator, pro).

