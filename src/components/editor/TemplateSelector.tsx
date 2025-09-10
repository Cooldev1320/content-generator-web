'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  width: number;
  height: number;
  isPremium: boolean;
  elements: any[];
}

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onTemplateSelect: (template: Template) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  isOpen,
  onClose,
  onTemplateSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'Stories'];

  const templates: Template[] = [
    {
      id: '1',
      name: 'Modern Instagram Post',
      category: 'Instagram',
      thumbnail: '🎨',
      width: 1080,
      height: 1080,
      isPremium: false,
      elements: [
        { type: 'rectangle', x: 0, y: 0, width: 1080, height: 1080, fill: '#f3f4f6' },
        { type: 'text', x: 540, y: 540, text: 'Your Text Here', fontSize: 48, fill: '#111827' }
      ],
    },
    {
      id: '2',
      name: 'Business Card',
      category: 'Business',
      thumbnail: '💼',
      width: 1050,
      height: 600,
      isPremium: true,
      elements: [
        { type: 'rectangle', x: 0, y: 0, width: 1050, height: 600, fill: '#1f2937' },
        { type: 'text', x: 50, y: 100, text: 'Business Name', fontSize: 32, fill: '#ffffff' }
      ],
    },
    {
      id: '3',
      name: 'Social Media Story',
      category: 'Stories',
      thumbnail: '📱',
      width: 1080,
      height: 1920,
      isPremium: false,
      elements: [
        { type: 'rectangle', x: 0, y: 0, width: 1080, height: 1920, fill: '#3b82f6' },
        { type: 'text', x: 540, y: 960, text: 'Story Title', fontSize: 64, fill: '#ffffff' }
      ],
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Choose Template</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onTemplateSelect(template)}
                >
                  {/* Template Preview */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                    <span className="text-4xl">{template.thumbnail}</span>
                    {template.isPremium && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                        PRO
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{template.category}</p>
                    <p className="text-xs text-gray-400">
                      {template.width} × {template.height}px
                    </p>
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
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Choose a template to start designing
            </p>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;