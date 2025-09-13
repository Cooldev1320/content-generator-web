'use client';

import { Card, Badge, Button } from '@/components/ui';
import type { TemplateListDto } from '@/types';

interface TemplateCardProps {
  template: TemplateListDto;
  onSelect: (templateId: string) => void;
  onPreview?: (templateId: string) => void;
}

export default function TemplateCard({ template, onSelect, onPreview }: TemplateCardProps) {
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
    <Card className="p-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div 
        className="aspect-video bg-gray-200 flex items-center justify-center relative"
        onClick={() => onSelect(template.id)}
      >
        {template.thumbnailUrl ? (
          <img
            src={template.thumbnailUrl}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="text-gray-400 text-4xl">🎨</div>
        )}
        
        {template.isPremium && (
          <div className="absolute top-2 right-2">
            <Badge variant="warning" size="sm">Premium</Badge>
          </div>
        )}

        {onPreview && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
            <Button
              variant="primary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template.id);
              }}
            >
              Preview
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {template.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" size="sm">
            {getCategoryName(template.category)}
          </Badge>
          
          <Button 
            size="sm" 
            variant="primary"
            onClick={() => onSelect(template.id)}
          >
            Use Template
          </Button>
        </div>
      </div>
    </Card>
  );
}
