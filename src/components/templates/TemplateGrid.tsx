'use client';

import { useState } from 'react';
import TemplateCard from './TemplateCard';
import TemplatePreview from './TemplatePreview';
import type { TemplateListDto } from '@/types';

interface TemplateGridProps {
  templates: TemplateListDto[];
  onTemplateSelect: (templateId: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function TemplateGrid({ 
  templates, 
  onTemplateSelect, 
  isLoading = false,
  emptyMessage = "No templates found"
}: TemplateGridProps) {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateListDto | null>(null);

  const handlePreview = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setPreviewTemplate(template);
    }
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🎨</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={onTemplateSelect}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          onClose={handleClosePreview}
          onSelect={() => {
            onTemplateSelect(previewTemplate.id);
            handleClosePreview();
          }}
        />
      )}
    </>
  );
}
