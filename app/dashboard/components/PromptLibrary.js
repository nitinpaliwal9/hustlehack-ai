'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Copy, 
  Edit, 
  Trash2, 
  Share2, 
  Heart, 
  Tag, 
  User, 
  Calendar,
  BookOpen,
  Brain
} from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';

export default function PromptLibrary({ userPlan: propUserPlan = 'starter' }) {
  const [prompts, setPrompts] = useState([])
  const [filteredPrompts, setFilteredPrompts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState(null)
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    description: '',
    content: '',
    category: 'content',
    tags: [],
    isPublic: false
  })
  const [loading, setLoading] = useState(true)

  const { user } = useAuth();
  // For demo, mock user plan. In real use, fetch from user profile or subscription.
  const userPlan = user?.plan || propUserPlan || 'starter';
  const planHierarchy = { starter: 1, creator: 2, pro: 3 };

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    { id: 'content', name: 'Content Creation', icon: Edit },
    { id: 'business', name: 'Business', icon: User },
    { id: 'marketing', name: 'Marketing', icon: Share2 },
    { id: 'social', name: 'Social Media', icon: Heart },
    { id: 'coding', name: 'Coding', icon: Brain },
    { id: 'education', name: 'Education', icon: BookOpen }
  ]

  // Fetch prompts from Supabase
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        // Use shared Supabase client
        const { data, error } = await supabase
          .from('prompts')
          .select('*');
        if (error || !data) {
          setPrompts([]);
          setFilteredPrompts([]);
        } else {
          // Add minPlan for demo: alternate plans for variety
          const promptsWithPlan = data.map((p, i) => ({
            ...p,
            minPlan: i % 3 === 0 ? 'starter' : i % 3 === 1 ? 'creator' : 'pro'
          }));
          setPrompts(promptsWithPlan);
          setFilteredPrompts(promptsWithPlan);
        }
      } catch (e) {
        setPrompts([]);
        setFilteredPrompts([]);
      }
      setLoading(false);
    };
    fetchPrompts();
  }, []);

  // Filter prompts based on search and category
  useEffect(() => {
    let filtered = prompts

    if (searchTerm) {
      filtered = filtered.filter(prompt => 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(prompt => prompt.category === selectedCategory)
    }

    setFilteredPrompts(filtered)
  }, [searchTerm, selectedCategory, prompts])

  const handleCreatePrompt = () => {
    if (!newPrompt.title || !newPrompt.content) {
      alert('Please fill in all required fields')
      return
    }

    const prompt = {
      id: Date.now(),
      ...newPrompt,
      author: 'You',
      isOwner: true,
      likes: 0,
      uses: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setPrompts([prompt, ...prompts])
    setNewPrompt({
      title: '',
      description: '',
      content: '',
      category: 'content',
      tags: [],
      isPublic: false
    })
    setShowCreateModal(false)
  }

  const handleEditPrompt = () => {
    if (!editingPrompt.title || !editingPrompt.content) {
      alert('Please fill in all required fields')
      return
    }

    setPrompts(prompts.map(prompt => 
      prompt.id === editingPrompt.id ? editingPrompt : prompt
    ))
    setEditingPrompt(null)
    setShowEditModal(false)
  }

  const handleDeletePrompt = (id) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      setPrompts(prompts.filter(prompt => prompt.id !== id))
    }
  }

  const handleCopyPrompt = (content) => {
    navigator.clipboard.writeText(content)
    alert('Prompt copied to clipboard!')
  }

  const handleLikePrompt = (id) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === id 
        ? { ...prompt, likes: prompt.likes + 1 }
        : prompt
    ))
  }

  const handleUsePrompt = (id) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === id 
        ? { ...prompt, uses: prompt.uses + 1 }
        : prompt
    ))
  }

  const PromptCard = ({ prompt }) => {
    const unlocked = planHierarchy[userPlan] >= planHierarchy[prompt.minPlan];
    return (
      <div className="rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{prompt.title}</h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{prompt.description}</p>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <User className="w-3 h-3" />
              <span>{prompt.author}</span>
              <Calendar className="w-3 h-3 ml-2" />
              <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full" style={{ background: prompt.isPublic ? 'rgba(0,255,194,0.12)' : 'var(--bg-surface)', color: prompt.isPublic ? '#00FFC2' : 'var(--text-primary)' }}>
              {prompt.isPublic ? 'Public' : 'Private'}
            </span>
            <span className="px-2 py-1 text-xs rounded-full" style={{ background: 'rgba(127,90,240,0.12)', color: '#7F5AF0' }}>
              {categories.find(cat => cat.id === prompt.category)?.name}
            </span>
          </div>
        </div>

        {/* Content Preview */}
        <div className="mb-4">
          <div className="rounded-lg p-3 max-h-32 overflow-y-auto" style={{ background: 'var(--bg-surface)' }}>
            <p className="text-sm font-mono leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {prompt.content.substring(0, 200)}
              {prompt.content.length > 200 && '...'}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full" style={{ background: 'rgba(127,90,240,0.12)', color: '#7F5AF0' }}>
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{prompt.likes} likes</span>
          </div>
          <div className="flex items-center gap-1">
            <Brain className="w-4 h-4" />
            <span>{prompt.uses} uses</span>
          </div>
        </div>

        {/* Actions */}
        {unlocked ? (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                handleCopyPrompt(prompt.content)
                handleUsePrompt(prompt.id)
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm"
              style={{ background: 'var(--accent)', color: '#000' }}
            >
              <Copy className="w-4 h-4" />
              Use
            </button>
            <button
              onClick={() => handleLikePrompt(prompt.id)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm"
              style={{ background: 'rgba(255,0,0,0.12)', color: '#F87171' }}
            >
              <Heart className="w-4 h-4" />
              Like
            </button>
            {prompt.isOwner && (
              <>
                <button
                  onClick={() => {
                    setEditingPrompt(prompt)
                    setShowEditModal(true)
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm"
                  style={{ background: 'rgba(127,90,240,0.12)', color: '#7F5AF0' }}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePrompt(prompt.id)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm"
                  style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-2 mt-2">
            <button className="bg-yellow-400 text-white px-4 py-2 rounded font-semibold shadow hover:bg-yellow-500 transition">
              Upgrade to unlock this prompt
            </button>
            <div className="text-xs text-red-500 font-medium">Locked for your current plan</div>
          </div>
        )}
      </div>
    );
  };

  const CreatePromptModal = ({ show, onClose, prompt, onSave, isEditing = false }) => {
    if (!show) return null

    const currentPrompt = isEditing ? editingPrompt : newPrompt
    const setCurrentPrompt = isEditing ? setEditingPrompt : setNewPrompt

    return (
      <div className="fixed inset-0" style={{ background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50 }}>
        <div className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {isEditing ? 'Edit Prompt' : 'Create New Prompt'}
            </h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Title *
              </label>
              <input
                type="text"
                value={currentPrompt?.title || ''}
                onChange={(e) => setCurrentPrompt({ ...currentPrompt, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                placeholder="Enter prompt title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Description
              </label>
              <input
                type="text"
                value={currentPrompt?.description || ''}
                onChange={(e) => setCurrentPrompt({ ...currentPrompt, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                placeholder="Brief description of the prompt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Prompt Content *
              </label>
              <textarea
                value={currentPrompt?.content || ''}
                onChange={(e) => setCurrentPrompt({ ...currentPrompt, content: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                placeholder="Enter your prompt here. Use [PLACEHOLDER] for variables."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Category
              </label>
              <select
                value={currentPrompt?.category || 'content'}
                onChange={(e) => setCurrentPrompt({ ...currentPrompt, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              >
                {categories.slice(1).map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={currentPrompt?.tags?.join(', ') || ''}
                onChange={(e) => setCurrentPrompt({ 
                  ...currentPrompt, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                })}
                className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                placeholder="ai, content, marketing"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={currentPrompt?.isPublic || false}
                onChange={(e) => setCurrentPrompt({ ...currentPrompt, isPublic: e.target.checked })}
                className="w-4 h-4 rounded focus:ring-purple-500"
                style={{ accentColor: 'var(--accent)', border: '1px solid var(--border-color)' }}
              />
              <label htmlFor="isPublic" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Make this prompt public (others can see and use it)
              </label>
            </div>
          </div>

          <div className="p-6 flex justify-end gap-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={onClose}
              className="px-4 py-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Cancel
            </button>
            <button
              onClick={isEditing ? handleEditPrompt : handleCreatePrompt}
              className="px-6 py-2 rounded-lg"
              style={{ background: 'var(--accent)', color: '#000' }}
            >
              {isEditing ? 'Update' : 'Create'} Prompt
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading your prompt library...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>📚 Prompt Library</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Create, manage, and share your AI prompts</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{ background: 'var(--accent)', color: '#000' }}
        >
          <Plus className="w-5 h-5" />
          Create Prompt
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
              style={
                selectedCategory === category.id
                  ? { background: 'var(--accent)', color: '#000' }
                  : { background: 'var(--bg-surface)', color: 'var(--text-secondary)' }
              }
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16" style={{ color: 'var(--text-secondary)' }} />
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>No prompts found</p>
          <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or create a new prompt</p>
        </div>
      )}

      {/* Create/Edit Modal */}
      <CreatePromptModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreatePrompt}
      />

      <CreatePromptModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingPrompt(null)
        }}
        onSave={handleEditPrompt}
        isEditing={true}
      />
    </div>
  )
}
