import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import type { HistoryItem, PagedResult } from '@/types';

interface UseHistoryOptions {
  pageSize?: number;
  autoLoad?: boolean;
}

export function useHistory(options: UseHistoryOptions = {}) {
  const { pageSize = 20, autoLoad = true } = options;
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
    totalCount: 0,
  });

  const loadHistory = useCallback(async (page = 1, filters?: {
    actionType?: string;
    projectId?: string;
    fromDate?: string;
    toDate?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.getHistory({
        page,
        pageSize,
        ...filters,
      });

      if (response.success && response.data) {
        setHistory(response.data.items);
        setPagination({
          page: response.data.page,
          totalPages: response.data.totalPages,
          totalCount: response.data.totalCount,
        });
      } else {
        throw new Error(response.message || 'Failed to load history');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history');
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  const loadRecentHistory = useCallback(async (count = 10) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.getRecentHistory(count);

      if (response.success && response.data) {
        setHistory(response.data);
        setPagination({
          page: 1,
          totalPages: 1,
          totalCount: response.data.length,
        });
      } else {
        throw new Error(response.message || 'Failed to load recent history');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recent history');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearHistory = useCallback(async (olderThan?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.clearHistory(olderThan);

      if (response.success) {
        // Reload current page after clearing
        await loadHistory(pagination.page);
      } else {
        throw new Error(response.message || 'Failed to clear history');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear history');
    } finally {
      setLoading(false);
    }
  }, [loadHistory, pagination.page]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      loadHistory(page);
    }
  }, [loadHistory, pagination.totalPages]);

  const nextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      goToPage(pagination.page + 1);
    }
  }, [goToPage, pagination.page, pagination.totalPages]);

  const prevPage = useCallback(() => {
    if (pagination.page > 1) {
      goToPage(pagination.page - 1);
    }
  }, [goToPage, pagination.page]);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad) {
      loadHistory(1);
    }
  }, [autoLoad, loadHistory]);

  return {
    history,
    loading,
    error,
    pagination,
    loadHistory,
    loadRecentHistory,
    clearHistory,
    goToPage,
    nextPage,
    prevPage,
    refresh: () => loadHistory(pagination.page),
  };
}
