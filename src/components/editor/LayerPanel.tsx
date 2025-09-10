'use client';

import React from 'react';

interface Layer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
}

interface LayerPanelProps {
  layers: Layer[];
  selectedLayerId?: string;
  onLayerSelect?: (layerId: string) => void;
  onLayerToggleVisibility?: (layerId: string) => void;
  onLayerToggleLock?: (layerId: string) => void;
  onLayerDelete?: (layerId: string) => void;
  onLayerRename?: (layerId: string, newName: string) => void;
}

export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  selectedLayerId,
  onLayerSelect,
  onLayerToggleVisibility,
  onLayerToggleLock,
  onLayerDelete,
  onLayerRename,
}) => {
  const handleRename = (layerId: string, currentName: string) => {
    const newName = prompt('Enter new layer name:', currentName);
    if (newName && newName !== currentName) {
      onLayerRename?.(layerId, newName);
    }
  };

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Layers</h3>
      </div>

      <div className="space-y-1">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`group flex items-center p-2 rounded-md cursor-pointer transition-colors ${
              selectedLayerId === layer.id
                ? 'bg-indigo-50 border border-indigo-200'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onLayerSelect?.(layer.id)}
          >
            {/* Layer Type Icon */}
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              {layer.type === 'text' && '📝'}
              {layer.type === 'rectangle' && '⬜'}
              {layer.type === 'circle' && '⭕'}
              {layer.type === 'image' && '🖼️'}
            </div>

            {/* Layer Name */}
            <div 
              className="flex-1 text-sm text-gray-900 truncate"
              onDoubleClick={() => handleRename(layer.id, layer.name)}
            >
              {layer.name}
            </div>

            {/* Layer Controls */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Visibility Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerToggleVisibility?.(layer.id);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
                title={layer.visible ? 'Hide layer' : 'Show layer'}
              >
                {layer.visible ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                )}
              </button>

              {/* Lock Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerToggleLock?.(layer.id);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
                title={layer.locked ? 'Unlock layer' : 'Lock layer'}
              >
                {layer.locked ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"/>
                  </svg>
                )}
              </button>

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this layer?')) {
                    onLayerDelete?.(layer.id);
                  }
                }}
                className="p-1 text-gray-400 hover:text-red-600"
                title="Delete layer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {layers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No layers yet</p>
          <p className="text-xs mt-1">Add elements to create layers</p>
        </div>
      )}
    </div>
  );
};

export default LayerPanel;