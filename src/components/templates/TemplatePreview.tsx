'use client';

import { Modal, Button, Badge } from '@/components/ui';
import type { TemplateListDto } from '@/types';

interface TemplatePreviewProps {
  template: TemplateListDto;
  onClose: () => void;
  onSelect: () => void;
}

export default function TemplatePreview({ template, onClose, onSelect }: TemplatePreviewProps) {
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
    <Modal isOpen={true} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Template Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Template Preview */}
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            {template.thumbnailUrl ? (
              <img
                src={template.thumbnailUrl}
                alt={template.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-gray-400 text-6xl">🎨</div>
            )}
          </div>

          {/* Template Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
              {template.isPremium && (
                <Badge variant="warning">Premium</Badge>
              )}
            </div>

            <p className="text-gray-600">{template.description}</p>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                {getCategoryName(template.category)}
              </Badge>
              <span className="text-sm text-gray-500">
                {template.downloadCount.toLocaleString()} downloads
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSelect}>
              Use This Template
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
