'use client';

import { useState } from 'react';
import { ChevronRightIcon, StarIcon, ClockIcon, UserGroupIcon, BookOpenIcon, LightBulbIcon, ChartBarIcon, CalendarIcon, PencilIcon, GlobeAltIcon, DocumentTextIcon, CameraIcon } from '@heroicons/react/24/outline';
import Navigation from '../../../components/NavigationClient';
import Footer from '../../../components/FooterClient';

export default function StudentProductivitySuite() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const resources = [
    {
      id: 1,
      title: "Study Planner Templates",
      description: "Aesthetic study schedules that actually work! Color-coded, time-blocked planners to keep you organized and motivated.",
      icon: CalendarIcon,
      category: "Planning",
      rating: 4.9,
      downloads: "12.4k",
      isPremium: false,
      tags: ["Notion", "PDF", "Printable"],
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: 2,
      title: "Note-Taking Systems",
      description: "Cornell notes, mind maps, and digital templates that make studying less boring and more effective.",
      icon: PencilIcon,
      category: "Organization",
      rating: 4.8,
      downloads: "8.7k",
      isPremium: true,
      tags: ["Notion", "OneNote", "PDF"],
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: 3,
      title: "Productivity Habit Tracker",
      description: "Track your daily wins, study streaks, and self-care routines. Because consistency is everything!",
      icon: ChartBarIcon,
      category: "Habits",
      rating: 4.7,
      downloads: "15.2k",
      isPremium: false,
      tags: ["Notion", "Excel", "Mobile"],
      color: "bg-green-100 text-green-700"
    },
    {
      id: 4,
      title: "Essay Writing Toolkit",
      description: "Research templates, citation generators, and outline formats to make essay writing less stressful.",
      icon: DocumentTextIcon,
      category: "Writing",
      rating: 4.9,
      downloads: "6.3k",
      isPremium: true,
      tags: ["Word", "Google Docs", "PDF"],
      color: "bg-orange-100 text-orange-700"
    },
    {
      id: 5,
      title: "Exam Prep Strategies",
      description: "Proven study techniques, flashcard templates, and test-taking strategies from top students.",
      icon: BookOpenIcon,
      category: "Studying",
      rating: 4.8,
      downloads: "19.8k",
      isPremium: false,
      tags: ["Anki", "Quizlet", "PDF"],
      color: "bg-pink-100 text-pink-700"
    },
    {
      id: 6,
      title: "Group Study Organizer",
      description: "Coordinate study groups, share resources, and track progress with your study squad.",
      icon: UserGroupIcon,
      category: "Collaboration",
      rating: 4.6,
      downloads: "4.1k",
      isPremium: true,
      tags: ["Notion", "Slack", "Discord"],
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      id: 7,
      title: "Creative Project Templates",
      description: "Design briefs, mood boards, and presentation templates for all your creative assignments.",
      icon: LightBulbIcon,
      category: "Creative",
      rating: 4.7,
      downloads: "7.9k",
      isPremium: true,
      tags: ["Figma", "Canva", "PowerPoint"],
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 8,
      title: "Time Management Mastery",
      description: "Pomodoro timers, time-blocking guides, and productivity hacks to maximize your study sessions.",
      icon: ClockIcon,
      category: "Productivity",
      rating: 4.8,
      downloads: "11.6k",
      isPremium: false,
      tags: ["Apps", "Techniques", "PDF"],
      color: "bg-red-100 text-red-700"
    },
    {
      id: 9,
      title: "Research Paper Toolkit",
      description: "Citation managers, source trackers, and formatting guides to make research papers less painful.",
      icon: GlobeAltIcon,
      category: "Research",
      rating: 4.9,
      downloads: "5.8k",
      isPremium: true,
      tags: ["Zotero", "Mendeley", "Word"],
      color: "bg-teal-100 text-teal-700"
    },
    {
      id: 10,
      title: "Study Aesthetic Pack",
      description: "Instagram-worthy study setups, phone wallpapers, and desktop backgrounds for motivation.",
      icon: CameraIcon,
      category: "Aesthetic",
      rating: 4.6,
      downloads: "23.1k",
      isPremium: false,
      tags: ["Images", "Wallpapers", "Social"],
      color: "bg-purple-100 text-purple-700"
    }
  ];

  const handleUpgrade = () => {
    // Replace with your actual Razorpay payment link
    window.open('https://razorpay.me/@hustlehack', '_blank');
  };

  const handlePricingRedirect = () => {
    window.location.href = '/pricing';
  };

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-black">
  	{/* Header Section */}
  	<div className="bg-zinc-900 shadow-sm border-b border-zinc-800 pt-48">
    	<div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-20">
      		<div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--primary)] mb-4">
          Student Productivity Suite ✨
        </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Level up your study game with templates, tools, and strategies that actually work. 
              No cap - these resources will transform your academic life! 🎓
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleUpgrade}
                className="bg-[#7F5AF0] hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Get Premium Access
                <ChevronRightIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handlePricingRedirect}
                className="border-2 border-[#7F5AF0] text-[#7F5AF0] hover:bg-[#7F5AF0] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <div
                key={resource.id}
                className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1 ${
                  hoveredCard === resource.id ? 'ring-2 ring-[#7F5AF0] ring-opacity-50' : ''
                }`}
                style={{ background: 'rgba(36,41,46,0.96)', border: '1px solid var(--border-color)' }}
                onMouseEnter={() => setHoveredCard(resource.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Premium Badge */}
                {resource.isPremium && (
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <StarIcon className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm">{resource.rating}</span>
                    </div>
                  </div>
                )}
                
                {/* Icon and Category */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${resource.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                    {resource.category}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {resource.title}
                </h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-md text-sm"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{resource.downloads} downloads</span>
                    {!resource.isPremium && (
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 fill-current text-yellow-400" />
                        <span>{resource.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {resource.isPremium ? (
                    <button
                      onClick={handleUpgrade}
                      className="bg-[#7F5AF0] hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      Upgrade
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        if (resource.id === 1) {
                          window.location.href = '/resources/toolkits-and-templates/student-productivity-suite/study-planner-templates';
                        } else {
                          // Handle other free resources here
                          console.log('Download clicked for:', resource.title);
                        }
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-[#7F5AF0] to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to become that student? 🚀
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who've transformed their study game with our premium resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleUpgrade}
              className="bg-white text-[#7F5AF0] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Get All Premium Resources
              <ChevronRightIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handlePricingRedirect}
              className="border-2 border-white text-white hover:bg-white hover:text-[#7F5AF0] px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View Pricing Plans
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>);
}
