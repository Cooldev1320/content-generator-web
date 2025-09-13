'use client';

import { useState } from 'react';
import { Button, Card, Modal } from '@/components/ui';
import type { TemplateListDto } from '@/types';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
  templates: TemplateListDto[];
  isLoading?: boolean;
}

export default function TemplateSelector({
  isOpen,
  onClose,
  onSelectTemplate,
  templates,
  isLoading = false
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelect = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onClose();
    }
  };

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      'social': 'Social Media',
      'marketing': 'Marketing',
      'business': 'Business',
      'branding': 'Branding',
      'blank': 'Blank'
    };
    return categories[category] || category;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Choose a Template</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-video rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`p-0 overflow-hidden cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:shadow-md hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  {template.thumbnailUrl ? (
                    <img
                      src={template.thumbnailUrl}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-2xl">🎨</div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {template.name}
                    </h3>
                    {template.isPremium && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {getCategoryName(template.category)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {template.downloadCount.toLocaleString()} downloads
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSelect}
            disabled={!selectedTemplate}
          >
            Use Template
          </Button>
        </div>
      </div>
    </Modal>
  );
}
