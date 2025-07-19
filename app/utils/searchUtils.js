// Search utility functions for the prompt library

// Category synonyms for semantic search
const CATEGORY_SYNONYMS = {
  'Fitness': ['gym', 'workout', 'exercise', 'bodybuilding', 'fitness', 'health', 'training', 'muscle', 'strength', 'cardio', 'weightlifting', 'sports', 'athletic', 'physical'],
  'Travel': ['travel', 'trip', 'vacation', 'journey', 'adventure', 'explore', 'destination', 'tourism', 'wanderlust', 'backpacking', 'holiday', 'getaway'],
  'Food & Recipes': ['food', 'recipe', 'cooking', 'cuisine', 'meal', 'dish', 'kitchen', 'chef', 'baking', 'nutrition', 'diet', 'healthy eating', 'gastronomy'],
  'Fashion': ['fashion', 'style', 'clothing', 'outfit', 'wardrobe', 'trend', 'designer', 'accessories', 'beauty', 'apparel', 'dress', 'shoes', 'jewelry'],
  'Education': ['education', 'learning', 'study', 'academic', 'school', 'university', 'course', 'knowledge', 'teaching', 'student', 'scholar', 'research'],
  'Tech & AI': ['tech', 'technology', 'ai', 'artificial intelligence', 'software', 'programming', 'coding', 'digital', 'innovation', 'startup', 'app', 'web', 'computer'],
  'Finance': ['finance', 'money', 'investment', 'banking', 'financial', 'wealth', 'budget', 'savings', 'trading', 'cryptocurrency', 'stock', 'business finance'],
  'Entrepreneurship': ['entrepreneur', 'business', 'startup', 'entrepreneurship', 'founder', 'company', 'venture', 'enterprise', 'leadership', 'innovation'],
  'Motivation': ['motivation', 'inspiration', 'motivational', 'encouragement', 'positive', 'mindset', 'success', 'achievement', 'goals', 'aspiration'],
  'Parenting': ['parenting', 'parent', 'family', 'children', 'kids', 'baby', 'maternal', 'paternal', 'family life', 'childcare', 'raising kids'],
  'Health & Wellness': ['health', 'wellness', 'wellbeing', 'mental health', 'self-care', 'meditation', 'mindfulness', 'therapy', 'healing', 'holistic'],
  'Gaming': ['gaming', 'game', 'esports', 'gamer', 'video game', 'playstation', 'xbox', 'nintendo', 'streaming', 'twitch', 'gaming community'],
  'Beauty': ['beauty', 'cosmetic', 'makeup', 'skincare', 'beauty tips', 'glamour', 'aesthetic', 'self-care', 'beauty routine', 'cosmetics'],
  'Real Estate': ['real estate', 'property', 'housing', 'home', 'house', 'realty', 'mortgage', 'investment property', 'real estate market', 'buying home'],
  'Photography': ['photography', 'photo', 'camera', 'photographer', 'shooting', 'capture', 'lens', 'digital photography', 'portrait', 'landscape'],
  'Lifestyle': ['lifestyle', 'life', 'daily life', 'routine', 'living', 'personal', 'wellness', 'balance', 'quality of life', 'life tips'],
  'Personal Branding': ['personal branding', 'brand', 'personal brand', 'reputation', 'online presence', 'professional image', 'brand identity', 'self-marketing'],
  'Business Tips': ['business tips', 'business advice', 'business strategy', 'business growth', 'business development', 'entrepreneurial tips', 'business success'],
  'Meme Marketing': ['meme', 'viral', 'trending', 'humor', 'comedy', 'funny', 'internet culture', 'social media humor', 'viral content'],
  'Influencer Growth': ['influencer', 'influence', 'social media growth', 'followers', 'engagement', 'content creator', 'social media influencer', 'growth hacking'],
  'Productivity': ['productivity', 'efficiency', 'time management', 'organization', 'workflow', 'productivity tips', 'getting things done', 'focus'],
  'Music': ['music', 'musician', 'song', 'artist', 'band', 'concert', 'music industry', 'recording', 'performance', 'music production'],
  'Books & Learning': ['books', 'reading', 'literature', 'learning', 'knowledge', 'education', 'book review', 'reading list', 'literary'],
  'Digital Marketing': ['digital marketing', 'marketing', 'online marketing', 'social media marketing', 'advertising', 'promotion', 'brand awareness', 'lead generation'],
  'Career Growth Tips': ['career', 'professional development', 'career growth', 'job advancement', 'professional success', 'career advice', 'workplace'],
  'Networking Hacks': ['networking', 'connections', 'professional network', 'relationship building', 'social connections', 'business networking'],
  'Industry Insights': ['industry', 'market insights', 'business intelligence', 'industry trends', 'market analysis', 'sector knowledge'],
  'Thought Leadership': ['thought leadership', 'expertise', 'authority', 'industry expert', 'knowledge sharing', 'professional influence'],
  'Startup & Entrepreneurship': ['startup', 'entrepreneurship', 'new business', 'venture', 'founder', 'entrepreneurial journey', 'business launch'],
  'AI & Tech Trends': ['ai trends', 'tech trends', 'artificial intelligence', 'technology trends', 'innovation', 'future tech', 'emerging technology'],
  'Leadership & Management': ['leadership', 'management', 'team leadership', 'executive', 'management skills', 'leadership development'],
  'Remote Work Productivity': ['remote work', 'work from home', 'telecommuting', 'virtual work', 'remote productivity', 'home office'],
  'Freelancing & Consulting': ['freelancing', 'consulting', 'freelancer', 'independent work', 'contract work', 'self-employed'],
  'Corporate Culture': ['corporate culture', 'workplace culture', 'company culture', 'organizational culture', 'work environment'],
  'Job Search & Resume Tips': ['job search', 'resume', 'job hunting', 'career search', 'employment', 'job application', 'interview'],
  'Workplace Motivation': ['workplace motivation', 'employee motivation', 'work motivation', 'professional motivation', 'career motivation'],
  'Business Development': ['business development', 'growth strategy', 'business expansion', 'market development', 'sales growth'],
  'Sales & Outreach': ['sales', 'outreach', 'selling', 'sales strategy', 'customer acquisition', 'lead generation', 'sales process'],
  'Marketing Strategies': ['marketing strategies', 'marketing plan', 'marketing tactics', 'brand strategy', 'marketing approach'],
  'Finance & Investment': ['finance', 'investment', 'financial planning', 'wealth management', 'financial strategy', 'money management'],
  'Diversity & Inclusion': ['diversity', 'inclusion', 'diversity and inclusion', 'equity', 'workplace diversity', 'inclusive culture'],
  'Employee Engagement': ['employee engagement', 'team engagement', 'workplace engagement', 'staff motivation', 'employee satisfaction'],
  'Recruitment & Hiring': ['recruitment', 'hiring', 'talent acquisition', 'recruiting', 'hiring process', 'talent management'],
  'Professional Learning & Upskilling': ['professional learning', 'upskilling', 'skill development', 'continuous learning', 'professional development'],
  'Personal Growth & Mindset': ['personal growth', 'mindset', 'self-improvement', 'personal development', 'growth mindset', 'self-help'],
  'Company Announcements': ['company announcements', 'business announcements', 'corporate communications', 'company updates', 'business news'],
  'Client Success Stories': ['client success', 'success stories', 'case studies', 'client testimonials', 'successful outcomes'],
  'Event & Webinar Promotions': ['events', 'webinars', 'event promotion', 'webinar marketing', 'conference', 'workshop']
};

// Function to calculate similarity between search term and category
function calculateSimilarity(searchTerm, categoryName) {
  const searchLower = searchTerm.toLowerCase();
  const categoryLower = categoryName.toLowerCase();
  
  // Direct match
  if (categoryLower.includes(searchLower) || searchLower.includes(categoryLower)) {
    return 1.0;
  }
  
  // Check synonyms
  const synonyms = CATEGORY_SYNONYMS[categoryName] || [];
  for (const synonym of synonyms) {
    if (synonym.toLowerCase().includes(searchLower) || searchLower.includes(synonym.toLowerCase())) {
      return 0.8;
    }
  }
  
  // Check for partial matches in synonyms
  for (const synonym of synonyms) {
    const synonymWords = synonym.toLowerCase().split(' ');
    const searchWords = searchLower.split(' ');
    
    for (const searchWord of searchWords) {
      for (const synonymWord of synonymWords) {
        if (synonymWord.includes(searchWord) || searchWord.includes(synonymWord)) {
          return 0.6;
        }
      }
    }
  }
  
  return 0;
}

// Enhanced search function
export function searchPrompts(searchTerm, categories, selectedCategory = '') {
  if (!searchTerm.trim()) {
    return { categories: [], allPrompts: [] };
  }
  
  const searchLower = searchTerm.toLowerCase();
  const results = {
    categories: [],
    allPrompts: []
  };
  
  // If a category is selected, search within that category
  if (selectedCategory) {
    const currentCategory = categories.find(cat => cat.name === selectedCategory);
    if (currentCategory) {
      const filteredPrompts = currentCategory.prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchLower) ||
        prompt.prompt.toLowerCase().includes(searchLower)
      );
      
      if (filteredPrompts.length > 0) {
        results.categories.push({
          ...currentCategory,
          prompts: filteredPrompts
        });
        results.allPrompts.push(...filteredPrompts);
      }
    }
  } else {
    // Search across all categories
    categories.forEach(category => {
      const categorySimilarity = calculateSimilarity(searchTerm, category.name);
      const matchingPrompts = category.prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchLower) ||
        prompt.prompt.toLowerCase().includes(searchLower)
      );
      
      // Include category if it has matching prompts or if search term matches category
      if (matchingPrompts.length > 0 || categorySimilarity > 0.3) {
        const relevantPrompts = categorySimilarity > 0.3 && matchingPrompts.length === 0 
          ? category.prompts.slice(0, 5) // Show top 5 prompts from semantically matching categories
          : matchingPrompts;
          
        results.categories.push({
          ...category,
          prompts: relevantPrompts,
          relevanceScore: categorySimilarity
        });
        results.allPrompts.push(...relevantPrompts);
      }
    });
    
    // Sort categories by relevance
    results.categories.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  }
  
  return results;
}

// Function to get search suggestions
export function getSearchSuggestions(searchTerm) {
  if (!searchTerm.trim()) return [];
  
  const suggestions = [];
  const searchLower = searchTerm.toLowerCase();
  
  // Add category suggestions
  Object.keys(CATEGORY_SYNONYMS).forEach(category => {
    const synonyms = CATEGORY_SYNONYMS[category];
    for (const synonym of synonyms) {
      if (synonym.toLowerCase().includes(searchLower)) {
        suggestions.push(`${synonym} (${category})`);
        break;
      }
    }
  });
  
  // Add common search terms
  const commonTerms = ['fitness', 'gym', 'workout', 'travel', 'food', 'fashion', 'tech', 'business', 'motivation', 'health'];
  commonTerms.forEach(term => {
    if (term.includes(searchLower) && !suggestions.includes(term)) {
      suggestions.push(term);
    }
  });
  
  return suggestions.slice(0, 5);
} 