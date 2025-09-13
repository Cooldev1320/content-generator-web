'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Input, Badge } from '@/components/ui';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [history, searchTerm, actionFilter, dateFilter]);

  const loadHistory = () => {
    try {
      // TODO: Replace with API call
      // const response = await apiClient.getHistory();
      // setHistory(response.data);

      // For now, load from localStorage
      const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
      setHistory(savedHistory);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterHistory = () => {
    let filtered = history;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by action
    if (actionFilter !== 'all') {
      filtered = filtered.filter(item => item.action === actionFilter);
    }

    // Filter by date
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(item => new Date(item.timestamp) >= filterDate);
    }

    setFilteredHistory(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created':
        return 'M12 6v6m0 0v6m0-6h6m-6 0H6';
      case 'updated':
        return 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z';
      case 'exported':
        return 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
      case 'deleted':
        return 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16';
      case 'shared':
        return 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z';
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'bg-green-100 text-green-800';
      case 'updated':
        return 'bg-blue-100 text-blue-800';
      case 'exported':
        return 'bg-purple-100 text-purple-800';
      case 'deleted':
        return 'bg-red-100 text-red-800';
      case 'shared':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionCounts = () => {
    return {
      all: history.length,
      created: history.filter(h => h.action === 'created').length,
      updated: history.filter(h => h.action === 'updated').length,
      exported: history.filter(h => h.action === 'exported').length,
      deleted: history.filter(h => h.action === 'deleted').length,
      shared: history.filter(h => h.action === 'shared').length,
    };
  };

  const actionCounts = getActionCounts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Activity History</h1>
          <p className="text-gray-600">
            Track all your project activities and changes over time.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Actions</p>
              <p className="text-2xl font-semibold text-gray-900">{actionCounts.all}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Created</p>
              <p className="text-2xl font-semibold text-gray-900">{actionCounts.created}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Updated</p>
              <p className="text-2xl font-semibold text-gray-900">{actionCounts.updated}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Exported</p>
              <p className="text-2xl font-semibold text-gray-900">{actionCounts.exported}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Shared</p>
              <p className="text-2xl font-semibold text-gray-900">{actionCounts.shared}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Deleted</p>
              <p className="text-2xl font-semibold text-gray-900">{actionCounts.deleted}</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Action Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={actionFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('all')}
              >
                All Actions ({actionCounts.all})
              </Button>
              <Button
                variant={actionFilter === 'created' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('created')}
              >
                Created ({actionCounts.created})
              </Button>
              <Button
                variant={actionFilter === 'updated' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('updated')}
              >
                Updated ({actionCounts.updated})
              </Button>
              <Button
                variant={actionFilter === 'exported' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('exported')}
              >
                Exported ({actionCounts.exported})
              </Button>
            </div>

            {/* Date Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={dateFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDateFilter('all')}
              >
                All Time
              </Button>
              <Button
                variant={dateFilter === 'today' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDateFilter('today')}
              >
                Today
              </Button>
              <Button
                variant={dateFilter === 'week' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDateFilter('week')}
              >
                This Week
              </Button>
              <Button
                variant={dateFilter === 'month' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDateFilter('month')}
              >
                This Month
              </Button>
            </div>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || actionFilter !== 'all' || dateFilter !== 'all' ? 'No history found' : 'No activity yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || actionFilter !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Your project activities will appear here'
              }
            </p>
            {!searchTerm && actionFilter === 'all' && dateFilter === 'all' && (
              <Button variant="primary" onClick={() => window.location.href = '/create'}>
                Create Your First Project
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getActionIcon(item.action)} />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.projectName}
                        </h3>
                        <Badge className={getActionColor(item.action)}>
                          {item.action}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(item.timestamp)}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {item.description}
                    </p>
                    {item.details && (
                      <div className="mt-2 text-xs text-gray-500">
                        {item.details}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
