import React from 'react';
import { Button } from '@/components/ui/Button';

interface HistoryItemProps {
  id: string;
  title: string;
  action: string;
  date: string;
  thumbnail: string;
  status: 'completed' | 'draft' | 'exported';
  type: string;
  size: string;
  onEdit?: (id: string) => void;
  onExport?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  id,
  title,
  action,
  date,
  thumbnail,
  status,
  type,
  size,
  onEdit,
  onExport,
  onDuplicate,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'exported':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'draft':
        return 'Draft';
      case 'exported':
        return 'Exported';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center space-x-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
            {thumbnail}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-900 truncate">
              {title}
            </p>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </span>
            </div>
          </div>
          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
            <span>{action}</span>
            <span>•</span>
            <span>{type}</span>
            <span>•</span>
            <span>{size}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {status === 'draft' && onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(id)}
            >
              Edit
            </Button>
          )}
          {status === 'completed' && onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(id)}
            >
              Export
            </Button>
          )}
          {onDuplicate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDuplicate(id)}
            >
              Duplicate
            </Button>
          )}
          <div className="relative">
            <button 
              className="p-2 text-gray-400 hover:text-gray-600"
              onClick={() => onDelete?.(id)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};