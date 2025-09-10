import React, { useState } from 'react';
import { HistoryItem } from './HistoryItem';
import { Button } from '@/components/ui/Button';

interface HistoryItemData {
  id: string;
  title: string;
  action: string;
  date: string;
  thumbnail: string;
  status: 'completed' | 'draft' | 'exported';
  type: string;
  size: string;
}

interface HistoryListProps {
  items: HistoryItemData[];
  onEdit?: (id: string) => void;
  onExport?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  items,
  onEdit,
  onExport,
  onDuplicate,
  onDelete,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'Completed', 'Draft', 'Exported'];

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

  const filteredItems = selectedFilter === 'All' 
    ? items 
    : items.filter(item => getStatusText(item.status) === selectedFilter);

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="text-4xl mb-4">📂</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No projects found
        </h3>
        <p className="text-gray-600 mb-6">
          {selectedFilter === 'All' 
            ? 'Start creating to see your project history'
            : `No ${selectedFilter.toLowerCase()} projects found`
          }
        </p>
        <Button>
          Create New Project
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === filter
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredItems.map((item) => (
          <HistoryItem
            key={item.id}
            {...item}
            onEdit={onEdit}
            onExport={onExport}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};