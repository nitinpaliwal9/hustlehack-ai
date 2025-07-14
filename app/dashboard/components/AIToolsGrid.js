'use client'

import { useState, useEffect } from 'react'
import { 
  Brain, 
  FileText, 
  Code, 
  Image, 
  MessageSquare, 
  Mail, 
  Youtube, 
  Instagram, 
  Twitter, 
  Linkedin,
  Sparkles,
  Zap,
  Copy,
  Download,
  Share,
  Heart,
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function AIToolsGrid({ userPlan = 'starter' }) {
  const [activeTool, setActiveTool] = useState(null)
  const [toolInputs, setToolInputs] = useState({})
  const [toolOutputs, setToolOutputs] = useState({})
  const [isProcessing, setIsProcessing] = useState({})

  const tools = [
    {
      id: 'content-generator',
      name: 'AI Content Generator',
      description: 'Generate high-quality content for blogs, social media, and marketing',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      category: 'Content Creation',
      minPlan: 'starter',
      usage: 45,
      limit: 100,
      inputFields: [
        { name: 'topic', type: 'text', placeholder: 'Enter your topic or keyword...', required: true },
        { name: 'type', type: 'select', options: ['Blog Post', 'Social Media', 'Email', 'Product Description'], required: true },
        { name: 'tone', type: 'select', options: ['Professional', 'Casual', 'Friendly', 'Persuasive'], required: true },
        { name: 'length', type: 'select', options: ['Short (100-200 words)', 'Medium (300-500 words)', 'Long (500+ words)'], required: true }
      ]
    },
    {
      id: 'social-media-optimizer',
      name: 'Social Media Optimizer',
      description: 'Optimize your social media posts for maximum engagement',
      icon: Instagram,
      color: 'from-pink-500 to-orange-500',
      category: 'Social Media',
      minPlan: 'starter',
      usage: 23,
      limit: 50,
      inputFields: [
        { name: 'platform', type: 'select', options: ['Instagram', 'Twitter', 'LinkedIn', 'Facebook'], required: true },
        { name: 'content', type: 'textarea', placeholder: 'Paste your content here...', required: true },
        { name: 'goal', type: 'select', options: ['Engagement', 'Reach', 'Conversions', 'Brand Awareness'], required: true }
      ]
    },
    {
      id: 'email-assistant',
      name: 'Email Assistant',
      description: 'Write professional emails and marketing campaigns',
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
      category: 'Communication',
      minPlan: 'creator',
      usage: 12,
      limit: 30,
      inputFields: [
        { name: 'type', type: 'select', options: ['Cold Email', 'Follow-up', 'Marketing Campaign', 'Newsletter'], required: true },
        { name: 'recipient', type: 'text', placeholder: 'Who are you writing to?', required: true },
        { name: 'purpose', type: 'text', placeholder: 'What is the purpose of this email?', required: true },
        { name: 'tone', type: 'select', options: ['Professional', 'Friendly', 'Persuasive', 'Urgent'], required: true }
      ]
    },
    {
      id: 'code-helper',
      name: 'Code Helper',
      description: 'Generate code snippets and solve programming problems',
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      category: 'Development',
      minPlan: 'creator',
      usage: 8,
      limit: 25,
      inputFields: [
        { name: 'language', type: 'select', options: ['JavaScript', 'Python', 'React', 'HTML/CSS', 'SQL'], required: true },
        { name: 'task', type: 'textarea', placeholder: 'Describe what you want to code...', required: true },
        { name: 'complexity', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'], required: true }
      ]
    },
    {
      id: 'youtube-optimizer',
      name: 'YouTube Optimizer',
      description: 'Optimize titles, descriptions, and tags for YouTube videos',
      icon: Youtube,
      color: 'from-red-500 to-pink-500',
      category: 'Video Content',
      minPlan: 'pro',
      usage: 5,
      limit: 15,
      inputFields: [
        { name: 'title', type: 'text', placeholder: 'Enter your video title...', required: true },
        { name: 'niche', type: 'select', options: ['Tech', 'Lifestyle', 'Education', 'Gaming', 'Business'], required: true },
        { name: 'duration', type: 'select', options: ['Short (< 1 min)', 'Medium (1-10 min)', 'Long (10+ min)'], required: true }
      ]
    },
    {
      id: 'automation-script',
      name: 'Automation Script Generator',
      description: 'Generate automation scripts for repetitive tasks',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      category: 'Automation',
      minPlan: 'pro',
      usage: 3,
      limit: 10,
      inputFields: [
        { name: 'task', type: 'textarea', placeholder: 'Describe the task you want to automate...', required: true },
        { name: 'platform', type: 'select', options: ['Web Browser', 'Desktop App', 'Mobile App', 'API'], required: true },
        { name: 'frequency', type: 'select', options: ['One-time', 'Daily', 'Weekly', 'On-demand'], required: true }
      ]
    }
  ]

  const isToolUnlocked = (tool) => {
    const planHierarchy = { starter: 1, creator: 2, pro: 3 }
    return planHierarchy[userPlan] >= planHierarchy[tool.minPlan]
  }

  const handleToolInput = (toolId, fieldName, value) => {
    setToolInputs(prev => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        [fieldName]: value
      }
    }))
  }

  const generateMockOutput = (tool, inputs) => {
    // Mock AI responses based on tool type
    switch (tool.id) {
      case 'content-generator':
        return {
          content: `# ${inputs.topic || 'Your Topic'}\n\nThis is a ${inputs.tone?.toLowerCase() || 'professional'} ${inputs.type?.toLowerCase() || 'blog post'} about ${inputs.topic || 'your topic'}.\n\n## Key Points\n\n• Engaging introduction that captures attention\n• Well-structured content with clear sections\n• Actionable insights and practical examples\n• Strong conclusion with call-to-action\n\n## Content\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\n**Key Takeaways:**\n- Professional ${inputs.tone?.toLowerCase() || 'tone'} maintained throughout\n- Optimized for ${inputs.type?.toLowerCase() || 'blog post'} format\n- ${inputs.length?.toLowerCase() || 'medium'} length as requested\n\n*Generated with HustleHack AI Content Generator*`,
          wordCount: 245,
          readingTime: '2 min',
          seoScore: 85
        }
      
      case 'social-media-optimizer':
        return {
          optimizedContent: `🚀 ${inputs.content?.substring(0, 100) || 'Your optimized content'}\n\n✨ Key improvements:\n• Enhanced engagement hooks\n• Strategic hashtag placement\n• Call-to-action optimization\n• ${inputs.platform || 'Platform'}-specific formatting\n\n#${inputs.platform?.toLowerCase() || 'social'}marketing #contentcreator #engagement`,
          hashtags: ['#contentcreator', '#socialmedia', '#marketing', '#engagement', '#growth'],
          engagementScore: 92,
          bestTimeToPost: '6:00 PM - 8:00 PM',
          improvements: [
            'Added engaging emojis for visual appeal',
            'Optimized hashtag strategy',
            'Improved call-to-action',
            'Enhanced readability'
          ]
        }
      
      case 'email-assistant':
        return {
          subject: `Re: ${inputs.purpose || 'Your Email Purpose'}`,
          emailBody: `Dear ${inputs.recipient || 'Recipient'},\n\nI hope this email finds you well. I'm writing to ${inputs.purpose?.toLowerCase() || 'discuss an important matter'}.\n\n${inputs.type === 'Cold Email' ? 'I came across your profile and was impressed by your work in [specific area].' : ''}\n\nI believe there's an opportunity for us to collaborate and create mutual value. Here's what I had in mind:\n\n• [Key point 1]\n• [Key point 2]\n• [Key point 3]\n\nWould you be available for a brief call next week to discuss this further?\n\nBest regards,\n[Your Name]`,
          openRate: '24%',
          replyRate: '8%',
          tone: inputs.tone || 'Professional'
        }
      
      case 'code-helper':
        return {
          code: `// ${inputs.language || 'JavaScript'} solution for: ${inputs.task || 'your task'}\n\n${inputs.language === 'Python' ? 'def solve_problem():\n    # Your solution here\n    pass' : 
            inputs.language === 'React' ? 'import React from "react";\n\nconst Component = () => {\n  // Your component logic here\n  return <div>Hello World</div>;\n};\n\nexport default Component;' :
            'function solveProblem() {\n  // Your solution here\n  console.log("Problem solved!");\n}'}\n\n// Usage example\n// Call the function when needed`,
          explanation: `This ${inputs.language || 'JavaScript'} code provides a ${inputs.complexity?.toLowerCase() || 'beginner'}-level solution for your task. The implementation follows best practices and includes error handling where appropriate.`,
          complexity: inputs.complexity || 'Beginner',
          language: inputs.language || 'JavaScript'
        }
      
      case 'youtube-optimizer':
        return {
          optimizedTitle: `${inputs.title || 'Your Video Title'} | ${inputs.niche || 'Content'} Tips That Actually Work!`,
          description: `In this ${inputs.duration?.toLowerCase() || 'medium'} video, I'll show you everything you need to know about ${inputs.title?.toLowerCase() || 'your topic'}.\n\n🎯 What you'll learn:\n• Key concept 1\n• Key concept 2\n• Key concept 3\n\n⭐ Timestamps:\n0:00 Introduction\n1:30 Main content\n5:00 Key takeaways\n\n🔔 Subscribe for more ${inputs.niche?.toLowerCase() || 'content'} tips!\n\n#${inputs.niche?.toLowerCase() || 'content'} #youtube #tutorial`,
          tags: ['tutorial', inputs.niche?.toLowerCase() || 'content', 'howto', 'tips', 'guide'],
          thumbnail: 'Suggested: Bold text overlay with contrasting colors',
          seoScore: 88,
          estimatedViews: '5K - 15K views'
        }
      
      case 'automation-script':
        return {
          script: `// Automation Script for: ${inputs.task || 'Your Task'}\n// Platform: ${inputs.platform || 'Web Browser'}\n// Frequency: ${inputs.frequency || 'On-demand'}\n\n// Step 1: Initialize\nconst automation = {\n  task: "${inputs.task || 'your task'}",\n  platform: "${inputs.platform || 'Web Browser'}",\n  frequency: "${inputs.frequency || 'On-demand'}"\n};\n\n// Step 2: Execute automation\nfunction executeAutomation() {\n  console.log('Starting automation...');\n  \n  // Your automation logic here\n  \n  console.log('Automation completed!');\n}\n\n// Step 3: Schedule if needed\nif (automation.frequency !== 'On-demand') {\n  // Set up scheduling\n  setInterval(executeAutomation, getInterval(automation.frequency));\n}`,
          steps: [
            'Initialize automation parameters',
            'Set up event listeners',
            'Execute main automation logic',
            'Handle errors and edge cases',
            'Log results and cleanup'
          ],
          estimatedTime: '30 minutes to implement',
          complexity: 'Intermediate'
        }
      
      default:
        return { content: 'Output generated successfully!' }
    }
  }

  const handleGenerateContent = async (tool) => {
    const inputs = toolInputs[tool.id] || {}
    
    // Validate required fields
    const missingFields = tool.inputFields
      .filter(field => field.required && !inputs[field.name])
      .map(field => field.name)
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    setIsProcessing(prev => ({ ...prev, [tool.id]: true }))
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))
    
    const output = generateMockOutput(tool, inputs)
    setToolOutputs(prev => ({ ...prev, [tool.id]: output }))
    setIsProcessing(prev => ({ ...prev, [tool.id]: false }))
    
    // Update usage count (mock)
    // In real implementation, this would update the database
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // Show success message
    alert('Content copied to clipboard!')
  }

  const ToolCard = ({ tool }) => {
    const unlocked = isToolUnlocked(tool)
    const usagePercentage = (tool.usage / tool.limit) * 100
    
    return (
      <div className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
        unlocked ? 'border-transparent hover:border-purple-200' : 'border-gray-200 opacity-75'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color}`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unlocked ? (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  Unlocked
                </span>
              ) : (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                  Locked
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">{tool.description}</p>

          {/* Usage Bar */}
          {unlocked && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Usage this month</span>
                <span>{tool.usage}/{tool.limit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    usagePercentage > 80 ? 'bg-red-500' : 
                    usagePercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() => unlocked ? setActiveTool(tool) : null}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              unlocked
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!unlocked}
          >
            {unlocked ? 'Use Tool' : `Upgrade to ${tool.minPlan}`}
          </button>
        </div>
      </div>
    )
  }

  const ToolModal = ({ tool, onClose }) => {
    const inputs = toolInputs[tool.id] || {}
    const output = toolOutputs[tool.id]
    const processing = isProcessing[tool.id]

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color}`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{tool.name}</h2>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            {!output ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure Your Tool</h3>
                {tool.inputFields.map(field => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {field.name} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={inputs[field.name] || ''}
                        onChange={(e) => handleToolInput(tool.id, field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    )}
                    {field.type === 'textarea' && (
                      <textarea
                        value={inputs[field.name] || ''}
                        onChange={(e) => handleToolInput(tool.id, field.name, e.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    )}
                    {field.type === 'select' && (
                      <select
                        value={inputs[field.name] || ''}
                        onChange={(e) => handleToolInput(tool.id, field.name, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select {field.name}</option>
                        {field.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
                
                <div className="pt-4">
                  <button
                    onClick={() => handleGenerateContent(tool)}
                    disabled={processing}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Content
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(typeof output === 'object' ? JSON.stringify(output, null, 2) : output)}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={() => setToolOutputs(prev => ({ ...prev, [tool.id]: null }))}
                      className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate New
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  {typeof output === 'object' ? (
                    <div className="space-y-4">
                      {Object.entries(output).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                          {Array.isArray(value) ? (
                            <ul className="list-disc list-inside space-y-1">
                              {value.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-gray-700 whitespace-pre-wrap">{value}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-700 whitespace-pre-wrap">{output}</div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Content generated successfully
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🤖 AI Tools</h2>
          <p className="text-gray-600">Powerful AI tools to boost your productivity</p>
        </div>
        <div className="text-sm text-gray-500">
          Plan: <span className="font-medium capitalize">{userPlan}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {activeTool && (
        <ToolModal
          tool={activeTool}
          onClose={() => setActiveTool(null)}
        />
      )}
    </div>
  )
}
