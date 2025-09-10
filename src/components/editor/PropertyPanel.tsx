'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SelectedElement {
  id: string;
  type: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

interface PropertyPanelProps {
  selectedElement?: SelectedElement;
  onElementUpdate?: (elementId: string, updates: Partial<SelectedElement>) => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedElement,
  onElementUpdate,
}) => {
  const handleUpdate = (property: string, value: any) => {
    if (selectedElement) {
      onElementUpdate?.(selectedElement.id, { [property]: value });
    }
  };

  if (!selectedElement) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No element selected</p>
          <p className="text-xs mt-1">Click on an element to edit properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
        <p className="text-sm text-gray-600 capitalize">{selectedElement.type}</p>
      </div>

      <div className="space-y-4">
        {/* Position */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Position</h4>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="X"
              type="number"
              value={selectedElement.x || 0}
              onChange={(e) => handleUpdate('x', Number(e.target.value) || 0)}
            />
            <Input
              label="Y"
              type="number"
              value={selectedElement.y || 0}
              onChange={(e) => handleUpdate('y', Number(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Size for rectangles */}
        {selectedElement.type === 'rectangle' && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Size</h4>
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Width"
                type="number"
                value={selectedElement.width || 0}
                onChange={(e) => handleUpdate('width', Number(e.target.value) || 0)}
              />
              <Input
                label="Height"
                type="number"
                value={selectedElement.height || 0}
                onChange={(e) => handleUpdate('height', Number(e.target.value) || 0)}
              />
            </div>
          </div>
        )}

        {/* Radius for circles */}
        {selectedElement.type === 'circle' && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Size</h4>
            <Input
              label="Radius"
              type="number"
              value={selectedElement.radius || 0}
              onChange={(e) => handleUpdate('radius', Number(e.target.value) || 0)}
            />
          </div>
        )}

        {/* Text properties */}
        {selectedElement.type === 'text' && (
          <>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Text</h4>
              <Input
                label="Content"
                value={selectedElement.text || ''}
                onChange={(e) => handleUpdate('text', e.target.value)}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Typography</h4>
              <div className="space-y-2">
                <Input
                  label="Font Size"
                  type="number"
                  value={selectedElement.fontSize || 16}
                  onChange={(e) => handleUpdate('fontSize', Number(e.target.value) || 16)}
                />
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Font Family
                  </label>
                  <select
                    value={selectedElement.fontFamily || 'Arial'}
                    onChange={(e) => handleUpdate('fontFamily', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Fill Color */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Fill</h4>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={selectedElement.fill || '#000000'}
              onChange={(e) => handleUpdate('fill', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              value={selectedElement.fill || '#000000'}
              onChange={(e) => handleUpdate('fill', e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

        {/* Stroke */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Stroke</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={selectedElement.stroke || '#000000'}
                onChange={(e) => handleUpdate('stroke', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <Input
                value={selectedElement.stroke || '#000000'}
                onChange={(e) => handleUpdate('stroke', e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
            <Input
              label="Stroke Width"
              type="number"
              value={selectedElement.strokeWidth || 0}
              onChange={(e) => handleUpdate('strokeWidth', Number(e.target.value) || 0)}
              min="0"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Actions</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                // Duplicate element logic
                console.log('Duplicate element');
              }}
            >
              Duplicate
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                // Delete element logic
                if (confirm('Delete this element?')) {
                  console.log('Delete element');
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;