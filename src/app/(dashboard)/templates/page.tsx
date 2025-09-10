'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'Stories'];

  const templates = [
    {
      id: '1',
      title: 'Modern Business Post',
      category: 'Instagram',
      isPremium: false,
      thumbnail: '🎨',
      description: 'Clean and professional design for business posts',
    },
    {
      id: '2',
      title: 'Creative Agency Banner',
      category: 'Facebook',
      isPremium: true,
      thumbnail: '✨',
      description: 'Eye-catching banner for creative agencies',
    },
    {
      id: '3',
      title: 'Minimalist Story',
      category: 'Stories',
      isPremium: false,
      thumbnail: '🎯',
      description: 'Simple and elegant story template',
    },
    {
      id: '4',
      title: 'Product Launch',
      category: 'Twitter',
      isPremium: true,
      thumbnail: '🚀',
      description: 'Perfect for announcing new products',
    },
    {
      id: '5',
      title: 'Professional Quote',
      category: 'LinkedIn',
      isPremium: false,
      thumbnail: '💼',
      description: 'Share inspiring quotes professionally',
    },
    {
      id: '6',
      title: 'Event Promotion',
      category: 'Instagram',
      isPremium: true,
      thumbnail: '🎉',
      description: 'Promote your events in style',
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: typeof templates[0]) => {
    console.log('Using template:', template.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
        <p className="mt-1 text-sm text-gray-600">
          Choose from our collection of professional templates
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Template Preview */}
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                <span className="text-4xl">{template.thumbnail}</span>
                {template.isPremium && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                    PRO
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {template.title}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {template.description}
                </p>
                <Button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full"
                  variant={template.isPremium ? 'primary' : 'outline'}
                >
                  {template.isPremium ? 'Use Template (Pro)' : 'Use Template'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No templates found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or category filter
          </p>
        </div>
      )}

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">
            Unlock Premium Templates
          </h2>
          <p className="text-indigo-100 mb-6">
            Get access to our entire collection of premium templates, advanced features, 
            and unlimited exports with our Pro plan.
          </p>
          <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
}