'use client';

import { useState, useEffect } from 'react';
import { Book, Code, FileText, Brain, CheckCircle, Download } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

export default function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  // For demo, mock user plan. In real use, fetch from user profile or subscription.
  const userPlan = user?.plan || 'starter';
  const planHierarchy = { starter: 1, creator: 2, pro: 3 };

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated fetch delay

      // Add minPlan to each resource for demo
      const mockResources = [
        { id: 1, title: 'AI Content Generator', category: 'AI Tools', type: 'tool', url: '/tools/content-generator', downloads: 1200, icon: Brain, minPlan: 'starter' },
        { id: 2, title: 'Social Media Prompt Pack', category: 'Templates', type: 'template', url: '/templates/social-media', downloads: 800, icon: FileText, minPlan: 'creator' },
        { id: 3, title: 'Automation Scripts', category: 'Scripts', type: 'script', url: '/scripts/automation', downloads: 1500, icon: Code, minPlan: 'pro' },
        { id: 4, title: 'Study Guides Collection', category: 'Educational', type: 'document', url: '/documents/study-guides', downloads: 950, icon: Book, minPlan: 'starter' },
      ];

      setResources(mockResources);
      setIsLoading(false);
    };

    fetchResources();
  }, []);

  if (isLoading) {
    return <div className="text-center py-6">Loading resources...</div>;
  }

  const ResourceCard = ({ resource }) => {
    const unlocked = planHierarchy[userPlan] >= planHierarchy[resource.minPlan];
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
        <div className="flex items-center mb-4">
          <resource.icon className="w-6 h-6 text-indigo-500 mr-2" />
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{resource.title}</h3>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{resource.category}</p>
        <div className="flex justify-between items-center">
          {unlocked ? (
            <Link href={resource.url} className="text-indigo-600 hover:underline">
              {resource.type === 'tool' || resource.type === 'template' ? 'Open' : 'View'}
            </Link>
          ) : (
            <button className="bg-yellow-400 text-white px-4 py-2 rounded font-semibold shadow hover:bg-yellow-500 transition">
              Upgrade to unlock this resource
            </button>
          )}
          <div className="flex items-center" style={{ color: 'var(--text-secondary)' }}>
            <Download className="w-4 h-4 mr-1" /> {resource.downloads}
          </div>
        </div>
        {!unlocked && (
          <div className="mt-2 text-xs text-red-500 font-medium">Locked for your current plan</div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>🌐 Resource Library</h2>
        <Link href="/resources/all" className="text-indigo-600 hover:underline">View All</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
