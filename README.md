# HustleHack AI

AI-powered platform for young Indian students, creators, and solopreneurs. Tools, templates, prompts & guides to help you grow faster.

## Professional Design Patterns & Styling Guide

### 🎨 **Professional Page Design Standards**

This section documents the styling and design patterns used for professional, production-level pages like the Startup Community page.

#### **Layout Structure:**
```jsx
// Professional Page Layout Pattern
<div className="min-h-screen bg-[#0F0F1B]">
  <Navigation />
  
  {/* Hero Section */}
  <section className="relative pt-24 pb-20 px-4 bg-gradient-to-b from-[#0F0F1B] via-[#181A2A] to-[#0F0F1B]">
    <div className="max-w-6xl mx-auto">
      {/* Hero content */}
    </div>
  </section>

  {/* Content Sections */}
  <section className="py-16 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Section content */}
    </div>
  </section>
</div>
```

#### **Key Design Principles:**

1. **Wide Layout (max-w-6xl)**
   - Use `max-w-6xl mx-auto` for main containers
   - Provides better use of screen space
   - More professional appearance

2. **Section-Based Structure**
   - Break content into separate `<section>` elements
   - Each section has its own container and spacing
   - Avoid long single cards

3. **Professional Spacing**
   - `py-16 px-4` for main sections
   - `py-20` for hero sections
   - `mb-12` for section headers
   - `gap-6` or `gap-8` for grid items

4. **Visual Hierarchy**
   - Large headings: `text-4xl md:text-5xl`
   - Section headings: `text-3xl md:text-4xl`
   - Sub-headings: `text-xl`
   - Body text: `text-lg` or `text-xl`

5. **Card-Based Design**
   ```jsx
   // Professional Card Pattern
   <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-[#7F5AF0]/50 transition-all duration-300">
     <span className="text-4xl mb-4 block">🎯</span>
     <h3 className="font-semibold text-white mb-2 text-lg">Title</h3>
     <p className="text-gray-300">Description</p>
   </div>
   ```

6. **Grid Layouts**
   ```jsx
   // 4-column grid for features
   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
   
   // 2-column grid for benefits
   <div className="grid md:grid-cols-2 gap-8">
   ```

7. **Gradient Backgrounds**
   ```jsx
   // Hero gradient
   bg-gradient-to-b from-[#0F0F1B] via-[#181A2A] to-[#0F0F1B]
   
   // Card gradients
   bg-gradient-to-r from-[#7F5AF0]/10 to-[#00FFC2]/10
   ```

8. **Professional CTAs**
   ```jsx
   <a className="inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl hover:shadow-[#00FFC2]/25 transition-all duration-300 transform hover:scale-105 border-2 border-[#00FFC2]">
     CTA Text
   </a>
   ```

#### **Brand Colors:**
- Primary: `#7F5AF0` (Purple)
- Accent: `#00FFC2` (Cyan)
- Warning: `#FFE27A` (Yellow)
- Background: `#0F0F1B` (Dark)
- Text: `#E5E7EB` (Light gray)

#### **Typography Scale:**
- Hero titles: `text-5xl md:text-6xl font-black`
- Section titles: `text-4xl md:text-5xl font-bold`
- Sub-titles: `text-3xl md:text-4xl font-bold`
- Body text: `text-lg md:text-xl`
- Small text: `text-gray-300`

#### **Spacing System:**
- Section padding: `py-16 px-4`
- Hero padding: `py-20 px-4`
- Card padding: `p-6` or `p-8`
- Grid gaps: `gap-6` or `gap-8`
- Margins: `mb-8`, `mb-12`

#### **Interactive Elements:**
- Hover effects: `hover:border-[#7F5AF0]/50 transition-all duration-300`
- Button hover: `hover:scale-105`
- Smooth transitions: `transition-all duration-300`

#### **Content Organization:**
1. **Hero Section** - Main value proposition
2. **Problem Statement** - Pain point identification
3. **Solution Introduction** - What you offer
4. **Features/Benefits** - What users get
5. **Call to Action** - Primary conversion
6. **Trust Signals** - Social proof
7. **Final CTA** - Secondary conversion

#### **Mobile Responsiveness:**
- Use `md:` and `lg:` prefixes for responsive design
- Grid layouts: `md:grid-cols-2 lg:grid-cols-4`
- Text sizing: `text-4xl md:text-5xl`
- Padding: `p-6 md:p-8`

#### **Professional Features:**
- Glassmorphism effects: `bg-white/5 backdrop-blur-xl`
- Subtle borders: `border border-white/10`
- Shadow effects: `shadow-2xl`
- Gradient text: `text-transparent bg-clip-text bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2]`

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/hustlehack-ai.git
cd hustlehack-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
hustlehack-ai/
├── app/                    # Next.js app directory
│   ├── components/         # Reusable components
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.js          # Root layout
├── public/                # Static assets
├── lib/                   # Utility functions
└── types/                 # TypeScript definitions
```

## Features

- **AI-Powered Tools**: Content generation, automation scripts
- **Resource Library**: Templates, prompts, guides
- **Community**: Connect with like-minded creators
- **Learning Paths**: Personalized AI education
- **Analytics**: Track your growth and progress

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@hustlehackai.com or join our [Discord community](https://discord.gg/hustlehackai).
