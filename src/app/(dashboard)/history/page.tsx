'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function HistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Completed', 'Draft', 'Exported'];

  interface HistoryItem {
    id: string;
    title: string;
    action: string;
    date: string;
    thumbnail: string;
    status: 'completed' | 'draft' | 'exported';
    type: string;
    size: string;
  }

  const historyItems: HistoryItem[] = [
    {
      id: '1',
      title: 'Instagram Post - Product Launch',
      action: 'Created project',
      date: '2 hours ago',
      thumbnail: '📱',
      status: 'draft',
      type: 'Instagram Post',
      size: '1080x1080',
    },
    {
      id: '2',
      title: 'Facebook Banner - Summer Sale',
      action: 'Exported to JPG',
      date: '1 day ago',
      thumbnail: '📘',
      status: 'exported',
      type: 'Facebook Post',
      size: '1200x630',
    },
    {
      id: '3',
      title: 'Twitter Header - Brand Update',
      action: 'Updated design',
      date: '3 days ago',
      thumbnail: '🐦',
      status: 'completed',
      type: 'Twitter Header',
      size: '1500x500',
    },
    {
      id: '4',
      title: 'LinkedIn Article Cover',
      action: 'Created from template',
      date: '1 week ago',
      thumbnail: '💼',
      status: 'exported',
      type: 'LinkedIn Post',
      size: '1200x627',
    },
  ];

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

  const filteredItems = selectedFilter === 'All' 
    ? historyItems 
    : historyItems.filter(item => getStatusText(item.status) === selectedFilter);

  const handleProjectAction = (item: HistoryItem, action: string) => {
    console.log(`${action} project:`, item.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project History</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your design projects and activities
          </p>
        </div>
        <Button>
          Export All
        </Button>
      </div>

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
      {filteredItems.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <li key={item.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {item.thumbnail}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{item.action}</span>
                      <span>•</span>
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {item.status === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProjectAction(item, 'edit')}
                      >
                        Edit
                      </Button>
                    )}
                    {item.status === 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProjectAction(item, 'export')}
                      >
                        Export
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleProjectAction(item, 'duplicate')}
                    >
                      Duplicate
                    </Button>
                    <div className="relative">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
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
      )}

      {/* Storage Usage */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Storage Usage</h3>
          <Button variant="outline" size="sm">
            Manage Storage
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Projects</span>
              <span>2.4 GB of 10 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: '24%' }}
              ></div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Upgrade to Pro for unlimited storage and advanced features.
          </div>
        </div>
      </div>
    </div>
  );
}