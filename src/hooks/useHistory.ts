import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/lib/api';
import { HistoryItem } from '@/types/api';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getHistory();
      
      if (response.success) {
        setHistory(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch history');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.clearHistory();
      
      if (response.success) {
        setHistory([]);
      } else {
        setError(response.message || 'Failed to clear history');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to clear history');
    } finally {
      setLoading(false);
    }
  }, []);

  const addHistoryItem = useCallback((item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: `history_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setHistory(prev => [newItem, ...prev]);
  }, []);

  const getRecentHistory = useCallback((limit = 10) => {
    return history.slice(0, limit);
  }, [history]);

  const filterHistory = useCallback((
    filters: {
      resourceType?: 'project' | 'template' | 'file';
      action?: string;
      search?: string;
    }
  ) => {
    return history.filter(item => {
      if (filters.resourceType && item.resourceType !== filters.resourceType) {
        return false;
      }
      
      if (filters.action && item.action !== filters.action) {
        return false;
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          item.resourceName.toLowerCase().includes(searchLower) ||
          item.action.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [history]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    error,
    fetchHistory,
    clearHistory,
    addHistoryItem,
    getRecentHistory,
    filterHistory,
  };
};

export default useHistory;