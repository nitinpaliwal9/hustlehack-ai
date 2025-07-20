'use client'

import { useState } from 'react'
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Video,
  FileText,
  Users,
  Zap,
  Shield,
  CreditCard,
  Settings,
  Download,
  Upload,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'
import Navigation from '../components/NavigationClient'
import Footer from '../components/FooterClient'

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [activeTab, setActiveTab] = useState('contact')

  // FAQ Categories
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: HelpCircle,
      faqs: [
        {
          question: 'What is HustleHack AI?',
          answer: 'HustleHack AI is a comprehensive platform that provides AI-powered tools, resources, and templates to help creators, entrepreneurs, and hustlers grow their businesses and personal brands. We offer everything from content creation tools to business automation scripts.'
        },
        {
          question: 'How do I get started with HustleHack AI?',
          answer: 'Getting started is easy! Simply sign up with your Google account, complete your profile, and you\'ll have access to our starter tools. For the first 100 users, we\'re offering free Creator Mode access with premium features.'
        },
        {
          question: 'What plans are available?',
          answer: 'We offer three main plans: Starter Hustler (free), Creator Mode (premium), and Pro Hacker (ultimate). Each plan includes different levels of access to our AI tools, templates, and resources.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Absolutely! We use industry-standard security measures including encryption, secure authentication, and regular security audits. Your data is stored securely in Supabase and we never share your personal information with third parties.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Billing',
      icon: Settings,
      faqs: [
        {
          question: 'How do I update my profile information?',
          answer: 'You can update your profile by going to the Profile Settings page. Click on your profile dropdown in the navigation bar and select "Profile Settings" to access your account information, change your password, or export your data.'
        },
        {
          question: 'How do I change my subscription plan?',
          answer: 'Currently, plan changes are handled through our support team. Contact us via WhatsApp (9540581090) or email (hustlehackai@gmail.com) and we\'ll help you upgrade or modify your subscription.'
        },
        {
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription at any time. Contact our support team and we\'ll process your cancellation. You\'ll continue to have access until the end of your current billing period.'
        },
        {
          question: 'How do I export my data?',
          answer: 'You can export all your data from the Profile Settings page. This includes your profile information, usage analytics, and any content you\'ve created. The data is provided in JSON format for easy portability.'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Features',
      icon: Zap,
      faqs: [
        {
          question: 'What AI tools are available?',
          answer: 'We offer a wide range of AI tools including content generators, prompt libraries, automation scripts, video creation tools, and business templates. Each tool is designed to help you work smarter and faster.'
        },
        {
          question: 'How do I access the AI content generator?',
          answer: 'Navigate to the Tools section in your dashboard and click on "AI Content Generator". You can then select your content type, provide prompts, and generate high-quality content in seconds.'
        },
        {
          question: 'Are there usage limits on tools?',
          answer: 'Usage limits vary by plan. Starter users have basic access, Creator Mode users get enhanced limits, and Pro users have unlimited access to all tools and features.'
        },
        {
          question: 'Can I save and reuse my prompts?',
          answer: 'Yes! You can save your favorite prompts in your personal prompt library. This feature is available to all users and helps you build a collection of effective prompts for different use cases.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Monitor,
      faqs: [
        {
          question: 'What browsers are supported?',
          answer: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser.'
        },
        {
          question: 'The page is loading slowly, what should I do?',
          answer: 'Try refreshing the page or clearing your browser cache. If the issue persists, check your internet connection or try accessing from a different device. Contact us if the problem continues.'
        },
        {
          question: 'I can\'t log in to my account',
          answer: 'First, make sure you\'re using the correct email address. If you signed up with Google, use the same Google account. If you\'re still having issues, try resetting your password or contact our support team.'
        },
        {
          question: 'How do I report a bug?',
          answer: 'If you encounter a bug, please contact us via WhatsApp or email with details about what happened, what you were trying to do, and any error messages you saw. Screenshots are helpful!'
        }
      ]
    }
  ]

  // Contact methods
  const contactMethods = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      description: 'Get instant help via WhatsApp',
      icon: MessageCircle,
      contact: '+91 9540581090',
      action: 'Chat on WhatsApp',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      link: 'https://wa.me/919540581090'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      contact: 'hustlehackai@gmail.com',
      action: 'Send Email',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      link: 'mailto:hustlehackai@gmail.com'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call us directly',
      icon: Phone,
      contact: '+91 9540581090',
      action: 'Call Now',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      link: 'tel:+919540581090'
    }
  ]

  // Support categories
  const supportCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics and set up your account',
      icon: BookOpen,
      color: 'bg-gradient-to-r from-blue-500 to-purple-500'
    },
    {
      id: 'tutorials',
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: Video,
      color: 'bg-gradient-to-r from-red-500 to-pink-500'
    },
    {
      id: 'documentation',
      title: 'Documentation',
      description: 'Detailed guides and references',
      icon: FileText,
      color: 'bg-gradient-to-r from-green-500 to-teal-500'
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with other users',
      icon: Users,
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ]

  // Filter FAQs based on search
  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  const toggleFaq = (faqIndex) => {
    setExpandedFaq(expandedFaq === faqIndex ? null : faqIndex)
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 sm:pt-28 lg:pt-32">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6">
              Help & Support
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-gray-300 max-w-3xl mx-auto">
              We're here to help you succeed! Get instant support, find answers to common questions, and learn how to make the most of HustleHack AI.
            </p>
          </div>

                  {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
            {contactMethods.map((method) => (
              <div key={method.id} className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-lg ${method.color} ${method.hoverColor} transition-colors`}>
                    <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">{method.title}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">{method.description}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{method.contact}</p>
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 ${method.color} text-white rounded-lg ${method.hoverColor} transition-colors font-medium text-sm sm:text-base w-full sm:w-auto`}
                >
                  {method.action}
                </a>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
            {[
              { id: 'contact', label: 'Contact Us', icon: MessageCircle },
              { id: 'faq', label: 'FAQ', icon: HelpCircle },
              { id: 'resources', label: 'Resources', icon: BookOpen }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-[#7F5AF0] text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-8">
                {/* Contact Form */}
                <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0] transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0] transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                      <select className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0] transition-colors">
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing & Subscription</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <textarea
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0] transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-[#7F5AF0] text-white rounded-lg hover:bg-[#6D4DC6] transition-colors font-medium"
                      >
                        Send Message
                      </button>
                      <button
                        type="button"
                        className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                      >
                        Clear Form
                      </button>
                    </div>
                  </form>
                </div>

                {/* Support Categories */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Support Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {supportCategories.map((category) => (
                      <div key={category.id} className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-6 hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <div className={`p-3 rounded-lg ${category.color} mb-4 inline-block`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                        <p className="text-gray-300 text-sm">{category.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-8">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-lg border bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0] transition-colors"
                  />
                </div>

                {/* FAQ Categories */}
                {filteredFaqs.map((category) => (
                  <div key={category.id} className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <category.icon className="w-6 h-6 text-[#7F5AF0]" />
                      <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                    </div>
                    <div className="space-y-4">
                      {category.faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-700 rounded-lg">
                          <button
                            onClick={() => toggleFaq(`${category.id}-${index}`)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
                          >
                            <span className="text-white font-medium">{faq.question}</span>
                            {expandedFaq === `${category.id}-${index}` ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          {expandedFaq === `${category.id}-${index}` && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {filteredFaqs.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                    <p className="text-gray-300">Try searching with different keywords or contact our support team directly.</p>
                  </div>
                )}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-8">
                {/* Documentation */}
                <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Documentation & Guides</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'Getting Started Guide', description: 'Complete setup and first steps', icon: BookOpen },
                      { title: 'AI Tools Tutorial', description: 'Learn to use our AI tools effectively', icon: Zap },
                      { title: 'Content Creation', description: 'Tips for creating engaging content', icon: FileText },
                      { title: 'Business Automation', description: 'Automate your business processes', icon: Settings },
                      { title: 'Security Best Practices', description: 'Keep your account and data secure', icon: Shield },
                      { title: 'API Documentation', description: 'Technical documentation for developers', icon: Code }
                    ].map((resource, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <resource.icon className="w-5 h-5 text-[#7F5AF0]" />
                          <h3 className="font-bold text-white">{resource.title}</h3>
                        </div>
                        <p className="text-gray-300 text-sm">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Tutorials */}
                <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Video Tutorials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'Platform Overview', duration: '5 min', icon: Monitor },
                      { title: 'AI Content Generator', duration: '8 min', icon: Zap },
                      { title: 'Prompt Library', duration: '6 min', icon: BookOpen },
                      { title: 'Dashboard Features', duration: '7 min', icon: Settings },
                      { title: 'Mobile App Guide', duration: '4 min', icon: Smartphone },
                      { title: 'Advanced Features', duration: '12 min', icon: Globe }
                    ].map((video, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <video.icon className="w-5 h-5 text-[#7F5AF0]" />
                          <h3 className="font-bold text-white">{video.title}</h3>
                        </div>
                        <p className="text-gray-300 text-sm">{video.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 