'use client';

import { useState, useEffect } from 'react';
import { Book, Code, FileText, Brain, CheckCircle, Download } from 'lucide-react';
import Link from 'next/link';
import { PLAN_HIERARCHY, isPlanAtLeast, getPlanDisplayName } from '../../planUtils';

export default function ResourceLibrary({ userPlan = 'starter' }) {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">🌐 Resource Library</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-6 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gray-600 rounded mr-2"></div>
                <div className="h-6 bg-gray-600 rounded flex-1"></div>
              </div>
              <div className="h-4 bg-gray-600 rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-600 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const ResourceCard = ({ resource }) => {
    const unlocked = isPlanAtLeast(userPlan, resource.minPlan);
    return (
      <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <resource.icon className="w-6 h-6 text-[#7F5AF0] mr-2" />
          <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
        </div>
        <p className="text-sm text-gray-300 mb-4">{resource.category}</p>
        <div className="flex justify-between items-center">
          {unlocked ? (
            <Link href={resource.url} className="text-[#7F5AF0] hover:text-[#6D4DC6] transition-colors font-medium">
              {resource.type === 'tool' || resource.type === 'template' ? 'Open' : 'View'}
            </Link>
          ) : (
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
              Upgrade to unlock
            </button>
          )}
          <div className="flex items-center text-gray-400">
            <Download className="w-4 h-4 mr-1" /> {resource.downloads}
          </div>
        </div>
        {!unlocked && (
          <div className="mt-3 text-xs text-red-400 font-medium bg-red-500/10 px-2 py-1 rounded">
            🔒 Locked for your current plan
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">🌐 Resource Library</h2>
        <Link href="/resources/all" className="text-[#7F5AF0] hover:text-[#6D4DC6] transition-colors font-medium">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
