import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  width: number;
  height: number;
  isPremium: boolean;
  description?: string;
  tags?: string[];
  author?: string;
  downloads?: number;
}

interface TemplatePreviewProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (template: Template) => void;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!template) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Preview Image */}
        <div className="flex-1">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {template.thumbnail}
            </div>
            {template.isPremium && (
              <div className="absolute top-4 right-4">
                <Badge variant="warning">PRO</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Template Details */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
              <Badge variant="secondary">{template.category}</Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>{template.width} × {template.height}px</span>
              {template.author && <span>by {template.author}</span>}
              {template.downloads && <span>{template.downloads} downloads</span>}
            </div>

            {template.description && (
              <p className="text-gray-700 leading-relaxed">{template.description}</p>
            )}
          </div>

          {/* Tags */}
          {template.tags && template.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant={template.isPremium ? "primary" : "primary"}
              size="lg"
              className="w-full"
              onClick={() => {
                onSelect?.(template);
                onClose();
              }}
            >
              {template.isPremium ? 'Use Template (Pro Required)' : 'Use This Template'}
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Save to Favorites
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Share
              </Button>
            </div>
          </div>

          {/* Premium Notice */}
          {template.isPremium && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Pro Template
                  </h3>
                  <p className="text-sm text-yellow-700">
                    This template requires a Pro subscription to use.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TemplatePreview;