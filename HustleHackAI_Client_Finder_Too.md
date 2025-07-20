# HustleHack AI – Client Finder Tool Spec
**File:** `client-finder-tool-spec.md`  
**Version:** v1.0 • 2025-07-19  
**Product Owner:** Nitin Paliwal  
**Developer Workflow Target:** Cursor (AI pair programmer)  
**Primary Tech:** Next.js (App Router) + TypeScript + Supabase + YouTube Data API + AI (OpenAI/compatible)  
**Launch Scope:** YouTube → Find channels that need *thumbnail design help*. Feature gated to **Creator** & **Pro** plan users.

---

## Table of Contents
- [0. Quick Start (For Cursor)](#0-quick-start-for-cursor)
- [1. Product Summary](#1-product-summary)
- [2. User Story](#2-user-story)
- [3. MVP Scope](#3-mvp-scope)
- [4. Experience Flow (Guided Mode)](#4-experience-flow-guided-mode)
- [5. Features & Filters](#5-features--filters)
- [6. UX States & Process Animation](#6-ux-states--process-animation)
- [7. Data & Types](#7-data--types)
- [8. API Contracts](#8-api-contracts)
- [9. AI Analysis Layer](#9-ai-analysis-layer)
- [10. Plan Gating & Usage Limits](#10-plan-gating--usage-limits)
- [11. Frontend Architecture](#11-frontend-architecture)
- [12. Backend Architecture](#12-backend-architecture)
- [13. Cost Controls](#13-cost-controls)
- [14. Analytics & Logging](#14-analytics--logging)
- [15. Security & Keys](#15-security--keys)
- [16. Open Questions Cursor Must Ask](#16-open-questions-cursor-must-ask)
- [17. Build Milestones & Tasks](#17-build-milestones--tasks)
- [18. Copy & Microcopy Pack](#18-copy--microcopy-pack)
- [19. Theming Tokens](#19-theming-tokens)
- [20. Future Extensions](#20-future-extensions)

---

## 0. Quick Start (For Cursor)
**Cursor, read this file fully before generating code.**  
Development must be *iterative*: after each milestone, **pause and ask for approval** before writing large code sections.

**Initial Tasks:**
1. Confirm project stack: Next.js 14 (App Router) + Supabase + env config.
2. Generate TypeScript interfaces from Section 7.
3. Scaffold `/app/client-finder` route with placeholder wizard steps.
4. Implement fake data mode (no API calls) so UI can be evaluated early.

**Always ask:**  
- “Do you want Guided Mode only or include Advanced Filters now?”  
- “Which AI provider key should I expect?”  
- “Should we implement SSE or simple polling in MVP?”

---

## 1. Product Summary
**What:** An interactive tool that helps HustleHack AI users (students, creators, freelancers) **find small/midsize YouTube channels that would pay for improved thumbnails** (and later, other services).  
**Why users care:** Finding clients is hard. This tool automates discovery, analysis, and outreach scripts.  
**Why it’s valuable to HustleHack AI:** Moves platform from “content library” to “earn with AI.” Drives upgrades to **Creator** & **Pro** plans.

---

## 2. User Story
> *“I’m a broke student who wants to earn online. I can do design in Canva but don’t know how to find clients. I select a niche, the tool shows channels that need better thumbnails, gives me sample pitch scripts, and I land my first paid gig.”*

---

## 3. MVP Scope
**Included:**
- YouTube platform only.
- Guided wizard: Platform (fixed), niche(s), subs range, activity window, “needs thumbnail help” toggle.
- Backend fetches channels via YouTube Data API (search + channel stats + recent videos).
- AI batch scoring: Thumbnail Opportunity Score + Short notes.
- Results explorer with filters + Fit Score.
- Outreach generator (email + IG DM copy).
- Plan gating: Creator (30 searches/mo), Pro (100).

**Excluded (future):**
- Multi-platform (Instagram, podcasts).
- Automated email send.
- In-app Canva editor.
- Sponsor/monetization scraping.

---

## 4. Experience Flow (Guided Mode)
**Step 0 – Welcome**  
“Find YouTube creators who need better thumbnails. Let’s go.”

**Step 1 – Select Niche(s)**  
Chips: Fitness, Study, Gaming, Finance, Tech & AI, etc.

**Step 2 – Select Channel Size**  
Subscriber slider (min/max). Presets: Small (5K–50K), Growing (50K–250K), Custom.

**Step 3 – Activity Filter**  
“Show channels that uploaded in last ___ days.” (default 60).

**Step 4 – Improvement Opportunity**  
Toggle: “Prioritize channels where thumbnail design can be improved.” (Yes by default).

**Step 5 – Review & Run**  
Summary → “Run Scan” button.

**Processing Screen** (animated; see §6).

**Results Screen**  
Tabular/cards, filters persist, select channels → Outreach.

**Outreach Modal**  
Pick tone → AI generates email + DM + subject lines.

**Save/Export**  
Save leads to user account (Supabase). Export CSV (Pro only).

---

## 5. Features & Filters
| Filter | Type | Required | Default | Notes |
|---|---|---|---|---|
| Platform | fixed | Yes | youtube | MVP locked. |
| Niche(s) | multi | Yes | user pick | Predefined taxonomies. |
| Subs Min/Max | range | Yes | 10K–200K | Use global numeric range; UI slider. |
| Recent Activity Days | int | Yes | 60 | Show active creators. |
| Region(s) | multi | No | All | Use YouTube regionCode where available. |
| Needs Thumbnail Help | bool | Yes | true | Triggers AI style analysis weight. |
| Max Results | int | Yes | plan based | 25 (Creator) / 100 (Pro). |

---

## 6. UX States & Process Animation
Create a **ProcessTimeline** component that advances through stages with short, human updates. This makes the tool feel “alive.”

**Stages:**
1. Fetching Channels
2. Collecting Recent Videos
3. Evaluating Thumbnails
4. Scoring Fit
5. Finalizing Results

**Visuals:**
- Animated checkmarks as each stage completes.
- Progress % bar top or sticky.
- Real-time log feed (SSE or simulated delays in MVP).

---

## 7. Data & Types

### 7.1 FinderState (client)
```ts
export type FinderState = {
  platform: "youtube";
  niches: string[];
  subsMin: number;
  subsMax: number;
  recentDays: number;
  regions: string[];
  needThumbnailHelp: boolean;
  maxResults: number;
  status: "idle" | "fetching" | "analyzing" | "scoring" | "ready" | "error";
  progress: number;         // 0-100
  sessionId?: string;
  results?: ChannelResult[];
  error?: string;
};

7.2 ChannelResult
export type ChannelResult = {
  channelId: string;
  name: string;
  url: string;
  subs: number;
  country?: string;
  lastUpload?: string;      // ISO
  avgViews?: number;
  thumbSamples: string[];   // image URLs (cached)
  notes?: string;           // short AI insight
  scores: {
    thumbnailOppty: number; // 0-100
    activity: number;
    sizeFit: number;
    overall: number;        // weighted composite
  };
  contact?: {
    email?: string;
    socials?: { type: "instagram"|"twitter"|"website"; url: string }[];
  };
};

7.3 UsageRecord (for plan limits)
export type FinderUsage = {
  userId: string;
  month: string; // YYYY-MM
  searchesUsed: number;
};
8. API Contracts
8.1 Start Search
POST /api/client-finder/search/start
{
  "platform": "youtube",
  "niches": ["fitness", "study"],
  "subs_min": 10000,
  "subs_max": 200000,
  "recent_days": 60,
  "regions": ["IN","US"],
  "need_thumbnail_help": true,
  "max_results": 25
}
Response:
{
  "session_id": "cf_abc123",
  "queued": true,
  "estimated_seconds": 20
}
8.2 Poll Progress (if not using SSE)
GET /api/client-finder/search/status?session_id=cf_abc123
{
  "session_id": "cf_abc123",
  "stage": "analyzing",
  "progress": 48,
  "message": "Analyzing 4/10 channels...",
  "partial_results": [ /* ChannelResult[] subset */ ]
}
8.3 Get Final Results
GET /api/client-finder/search/results?session_id=cf_abc123
{
  "results": [ /* ChannelResult[] full */ ],
  "completed": true,
  "total": 18
}
8.4 Generate Outreach
POST /api/client-finder/outreach
{
  "channels": [
    {"channelId":"UC_123","name":"FitWithRiya","notes":"Strong content, weak thumbnails"}
  ],
  "service": "thumbnail_design",
  "tone": "friendly",
  "language": "en",
  "offer_type": "free_sample"
}
Response:
{
  "scripts": [
    {
      "channelId":"UC_123",
      "email_subject":"Thumbnail ideas for your channel?",
      "email_body":"Hi Riya,...",
      "dm_instagram":"Hey Riya! Loved your last workout video..."
    }
  ]
}
9. AI Analysis Layer
9.1 Goals
Detect if thumbnails are DIY / inconsistent / low contrast / wordy.

Compare to competitor channels (optional).

Produce Thumbnail Opportunity Score (0–100) + short note.

9.2 Input Compression
Do NOT send raw image binaries to AI in MVP. Use heuristics:

Extract video titles.

Provide thumbnail filenames + heuristics (dimensions, % face, % text estimate using simple OCR/vision API if available later).

Provide channel stats (subs, avg views, last upload).

9.3 Prompt Template (MVP)
You are a YouTube growth consultant. For each channel below, score how much better thumbnail design could improve click-through (0-100). Use only the provided metadata (assume thumbnail quality from 'thumb_quality_hint'). Return JSON array: channelId, score, notes (<=160 chars).
Example Input Data Snippet:
{
 "channels":[
   {
     "channelId":"UC_123",
     "name":"FitWithRiya",
     "subs":42000,
     "lastUploadDays":7,
     "avgViews":5500,
     "thumb_quality_hint":"text-small busy colors inconsistent",
     "recentTitles":["Full Body 20 Min","Leg Day Mistakes","No Gym Fat Loss"]
   }
 ]
}
10. Plan Gating & Usage Limits
Plan	Max Searches / Month	Max Results Returned	Outreach Generation	Export	Weight Sliders
Starter (₹99)	0 (upgrade prompt)	—	—	—	—
Creator (₹199)	30	25	Per-channel	No	No
Pro (₹299)	100	100	Batch	CSV	Yes

Implementation:

Store usage in client_finder_usage table.

Increment after successful /search/start.

Block if limit exceeded → return 402-style message + upgrade link.
11. Frontend Architecture
11.1 Route Structure
/app/client-finder/page.tsx              // entry, loads wizard
/app/client-finder/results/page.tsx      // optional separate route (or client state)
/app/(components)/client-finder/...      // shared components

11.2 Key Components
FinderWizard – stepper UI.

FilterPanel – advanced filters (Pro).

ProcessTimeline – stages + progress feed.

ResultsGrid – card/table switcher.

ChannelDrawer – expanded details + tabs.

OutreachModal – script generation & copy buttons.

UsageMeter – shows searches left (plan gating).

12. Backend Architecture
12.1 Flow Diagram (Text)
Client Wizard → /search/start (auth user + params)
  → Validate plan + usage
  → Query YouTube API for candidate channels
  → Pull recent video metadata
  → Heuristic thumbnail quality hint
  → Batch AI scoring (compress input)
  → Persist ChannelResult[] -> session store (Supabase JSON or Redis)
  → Mark usage consumed
Client polls /status or listens SSE
Client loads /results when ready
12.2 Storage
client_finder_sessions (session_id PK, user_id FK, params JSON, status, created_at).

client_finder_results (session_id FK, results JSONB).

client_finder_usage (user_id, month, searchesUsed).

13. Cost Controls
Do now:

Limit channels fetched to max_results * 2 before AI (filter after stats).

Batch AI scoring in groups of 5–10 channels.

Cache search results by (niches, subs_min, subs_max, recent_days) to reuse for other users within 24h.

Use cheaper model (gpt-4o-mini / Claude Haiku).

Optional skip in MVP: competitor comparison.

14. Analytics & Logging
Track server events:

search_started

search_completed

ai_tokens_used

outreach_generated

plan_blocked

Expose to admin dashboard later.

15. Security & Keys
Public keys: None. Client never hits AI directly.

Server env:

SUPABASE_SERVICE_ROLE_KEY

YOUTUBE_API_KEY

AI_API_KEY (OpenAI or provider)

Validate authenticated Supabase session on API calls.

Rate-limit by user id + IP.

16. Open Questions Cursor Must Ask
Cursor MUST pause and ask the user (Nitin) before proceeding when any of these are unclear:

Confirm Supabase schema names (profiles table id = auth.users.id?).

Which niche list to seed initially?

Should Starter plan see demo results or total lock?

Do we need Hindi copy / Hinglish toggles in outreach?

Where are brand assets (logo URLs) stored?

Confirm AI provider (OpenAI vs OpenRouter vs local).

Should we add sample data mode for offline dev?

17. Build Milestones & Tasks
Milestone 1 – Skeleton UI (No Backend)
 Create /client-finder route with 5-step wizard.

 Local state (FinderState).

 Fake progress simulation.

 Mock results cards.

Cursor ask: “Review UI before backend?”

Milestone 2 – Plan Gating & Usage UI
 Read user plan from Supabase.

 Show searches remaining.

 Block Start if over limit.

Milestone 3 – YouTube Metadata Fetch
 Backend endpoint: search channels by keyword/niches.

 Get subs, last upload, 5 recent thumbnails (URLs).

 Filter by sub range + recent days.

Milestone 4 – AI Scoring Integration
 Compress channel data.

 Batch call AI scoring.

 Merge results + produce ChannelResult[].

Milestone 5 – Progress Streaming (SSE or Poll)
 Emit stage events.

 Update ProcessTimeline.

Milestone 6 – Outreach Generator
 API endpoint to generate email + DM per channel.

 Tone: friendly / pro / Hinglish.

 UI copy buttons.

Milestone 7 – Persistence & Saved Leads
 Save selected channels to user_leads.

 Export CSV (Pro).

Milestone 8 – Polish & Beta Launch
 Branding + colors.

 Microcopy & tooltips.

 Error states.

 Analytics events.

18. Copy & Microcopy Pack
Welcome:

“Let’s help you land paying clients. Pick a niche and we’ll find YouTube creators who could use better thumbnails.”

Need Thumbnail Help Toggle:

“Turn this on to prioritize channels where design upgrades may boost clicks.”

Results Header (success):

“We found 18 channels that fit your filters. Select a few to pitch!”

Limit Reached:

“You’ve used all searches in your plan. Upgrade for more client leads.”

Processing Logs Examples:

“Scanning YouTube…”

“Collecting recent videos from @FitWithRiya…”

“Evaluating thumbnail clarity…”

“Scoring growth potential…”

“Almost done… polishing results!”

19. Theming Tokens
Token	Value	Usage
--hh-purple	#7F5AF0	Primary brand, buttons
--hh-teal	#00FFC2	Accents, progress, glow
--hh-bg-dark	#0F0F1A	Dark app BG
--hh-success	#00D47A	Positive badges
--hh-warn	#FFC857	Usage nearing limit
--hh-error	#FF4D8A	Errors

Fonts: Inter / Poppins / system fallback. Radius: 8px. Shadows: subtle purple glow for “AI working.”

20. Future Extensions
Multi-platform: Instagram, Podcasts, Newsletters.

AI screenshot capture & actual image quality scoring.

Automated outreach sending + lead CRM.

Paid lead marketplace (creators post needs).

Matching engine: “Creators needing 30-day thumbnail pack.”

End of Spec
Cursor: Please acknowledge you’ve read the full spec. Ask me the Open Questions in Section 16 before generating code. Then begin with Milestone 1 (Skeleton UI) unless I say otherwise.

---

Let me know when you’ve pasted this into Cursor and are ready to move to **Milestone 1 – Skeleton UI**. I can also help you answer the Open Question checklist so Cursor starts with the right assumptions.
