'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';

interface PropertyPanelProps {
  selectedElement?: {
    id: string;
    type: string;
    left: number;
    top: number;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    fontSize?: number;
    fontFamily?: string;
    text?: string;
  };
  onPropertyChange: (property: string, value: any) => void;
}

export default function PropertyPanel({ selectedElement, onPropertyChange }: PropertyPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Properties</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        </div>
        {isExpanded && (
          <div className="flex-1 p-4">
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">⚙️</div>
              <p className="text-sm text-gray-500">Select an element to edit properties</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Properties</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Position */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Position</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">X</label>
                  <Input
                    type="number"
                    value={selectedElement.left}
                    onChange={(e) => onPropertyChange('left', parseFloat(e.target.value) || 0)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Y</label>
                  <Input
                    type="number"
                    value={selectedElement.top}
                    onChange={(e) => onPropertyChange('top', parseFloat(e.target.value) || 0)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Size */}
            {selectedElement.width !== undefined && selectedElement.height !== undefined && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Size</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Width</label>
                    <Input
                      type="number"
                      value={selectedElement.width}
                      onChange={(e) => onPropertyChange('width', parseFloat(e.target.value) || 0)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Height</label>
                    <Input
                      type="number"
                      value={selectedElement.height}
                      onChange={(e) => onPropertyChange('height', parseFloat(e.target.value) || 0)}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Fill Color */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Fill Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedElement.fill || '#000000'}
                  onChange={(e) => onPropertyChange('fill', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300"
                />
                <Input
                  value={selectedElement.fill || ''}
                  onChange={(e) => onPropertyChange('fill', e.target.value)}
                  placeholder="#000000"
                  className="text-sm"
                />
              </div>
            </div>

            {/* Stroke */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Stroke</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={selectedElement.stroke || '#000000'}
                    onChange={(e) => onPropertyChange('stroke', e.target.value)}
                    className="w-6 h-6 rounded border border-gray-300"
                  />
                  <Input
                    value={selectedElement.stroke || ''}
                    onChange={(e) => onPropertyChange('stroke', e.target.value)}
                    placeholder="#000000"
                    className="text-sm flex-1"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Width</label>
                  <Input
                    type="number"
                    value={selectedElement.strokeWidth || 0}
                    onChange={(e) => onPropertyChange('strokeWidth', parseFloat(e.target.value) || 0)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Opacity */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Opacity</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={selectedElement.opacity || 1}
                  onChange={(e) => onPropertyChange('opacity', parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs text-gray-500 w-8">
                  {Math.round((selectedElement.opacity || 1) * 100)}%
                </span>
              </div>
            </div>

            {/* Text Properties */}
            {selectedElement.type === 'text' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Text</label>
                  <textarea
                    value={selectedElement.text || ''}
                    onChange={(e) => onPropertyChange('text', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Font Size</label>
                  <Input
                    type="number"
                    value={selectedElement.fontSize || 16}
                    onChange={(e) => onPropertyChange('fontSize', parseFloat(e.target.value) || 16)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Font Family</label>
                  <select
                    value={selectedElement.fontFamily || 'Arial'}
                    onChange={(e) => onPropertyChange('fontFamily', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
