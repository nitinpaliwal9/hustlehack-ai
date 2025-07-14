'use client';

import { useState, useEffect } from 'react';
import { Book, Code, FileText, Brain, CheckCircle, Download } from 'lucide-react';
import Link from 'next/link';

export default function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated fetch delay

      const mockResources = [
        { id: 1, title: 'AI Content Generator', category: 'AI Tools', type: 'tool', url: '/tools/content-generator', downloads: 1200, icon: Brain },
        { id: 2, title: 'Social Media Prompt Pack', category: 'Templates', type: 'template', url: '/templates/social-media', downloads: 800, icon: FileText },
        { id: 3, title: 'Automation Scripts', category: 'Scripts', type: 'script', url: '/scripts/automation', downloads: 1500, icon: Code },
        { id: 4, title: 'Study Guides Collection', category: 'Educational', type: 'document', url: '/documents/study-guides', downloads: 950, icon: Book },
      ];

      setResources(mockResources);
      setIsLoading(false);
    };

    fetchResources();
  }, []);

  if (isLoading) {
    return <div className="text-center py-6">Loading resources...</div>;
  }

  const ResourceCard = ({ resource }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center mb-4">
        <resource.icon className="w-6 h-6 text-indigo-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">{resource.category}</p>
      <div className="flex justify-between items-center">
        <Link href={resource.url} className="text-indigo-600 hover:underline">
          {resource.type === 'tool' || resource.type === 'template' ? 'Open' : 'View'}
        </Link>
        <div className="flex items-center text-gray-500">
          <Download className="w-4 h-4 mr-1" /> {resource.downloads}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">🌐 Resource Library</h2>
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
