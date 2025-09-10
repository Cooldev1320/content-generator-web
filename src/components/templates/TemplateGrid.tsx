import React, { useState } from 'react';
import { TemplateCard } from './TemplateCard';
import { Input } from '@/components/ui/Input';

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  width: number;
  height: number;
  isPremium: boolean;
  description?: string;
}

interface TemplateGridProps {
  templates: Template[];
  onTemplateSelect?: (template: Template) => void;
  onTemplatePreview?: (template: Template) => void;
  categories?: string[];
  searchable?: boolean;
  className?: string;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  onTemplateSelect,
  onTemplatePreview,
  categories = ['All'],
  searchable = true,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allCategories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  const displayCategories = categories.length > 1 ? categories : allCategories;

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchable ? 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      {(searchable || displayCategories.length > 1) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
          
          {displayCategories.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {displayCategories.map((category) => (
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
          )}
        </div>
      )}

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={onTemplateSelect}
              onPreview={onTemplatePreview}
            />
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

      {/* Results count */}
      <div className="text-sm text-gray-500 text-center">
        Showing {filteredTemplates.length} of {templates.length} templates
      </div>
    </div>
  );
};

export default TemplateGrid;