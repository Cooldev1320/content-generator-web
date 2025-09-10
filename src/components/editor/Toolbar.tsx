'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

interface ToolbarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onExport?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedTool,
  onToolSelect,
  onUndo,
  onRedo,
  onSave,
  onExport,
  canUndo = false,
  canRedo = false,
}) => {
  const tools = [
    { id: 'select', name: 'Select', icon: '👆', description: 'Select and move elements' },
    { id: 'rectangle', name: 'Rectangle', icon: '⬜', description: 'Draw rectangles' },
    { id: 'circle', name: 'Circle', icon: '⭕', description: 'Draw circles' },
    { id: 'text', name: 'Text', icon: '📝', description: 'Add text' },
    { id: 'image', name: 'Image', icon: '🖼️', description: 'Add images' },
    { id: 'line', name: 'Line', icon: '📏', description: 'Draw lines' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left side - Tools */}
        <div className="flex items-center space-x-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolSelect(tool.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                selectedTool === tool.id
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title={tool.description}
            >
              <span className="text-lg mb-1">{tool.icon}</span>
              <span className="text-xs">{tool.name}</span>
            </button>
          ))}
        </div>

        {/* Center - Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-2 rounded-md transition-colors ${
              canUndo
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            title="Undo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-2 rounded-md transition-colors ${
              canRedo
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            title="Redo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
          >
            Save
          </Button>

          <Button
            size="sm"
            onClick={onExport}
          >
            Export
          </Button>
        </div>

        {/* Right side - View options */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            title="Zoom in"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>

          <span className="text-sm text-gray-600">100%</span>

          <button
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            title="Zoom out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;