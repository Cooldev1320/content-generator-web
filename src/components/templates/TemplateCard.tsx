import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

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

interface TemplateCardProps {
  template: Template;
  onSelect?: (template: Template) => void;
  onPreview?: (template: Template) => void;
  className?: string;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  onPreview,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      {/* Template Preview */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
           onClick={() => onPreview?.(template)}>
        <div className="w-full h-full flex items-center justify-center text-4xl">
          {template.thumbnail}
        </div>
        
        {/* Premium Badge */}
        {template.isPremium && (
          <div className="absolute top-2 right-2">
            <Badge variant="warning" size="sm">PRO</Badge>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <Button
            variant="primary"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(template);
            }}
          >
            Preview
          </Button>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
            {template.name}
          </h3>
          <Badge variant="secondary" size="xs">
            {template.category}
          </Badge>
        </div>
        
        <p className="text-xs text-gray-500 mb-3">
          {template.width} × {template.height}px
        </p>

        {template.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {template.description}
          </p>
        )}

        <Button
          variant={template.isPremium ? "primary" : "outline"}
          size="sm"
          className="w-full"
          onClick={() => onSelect?.(template)}
        >
          {template.isPremium ? 'Use Template (Pro)' : 'Use Template'}
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;