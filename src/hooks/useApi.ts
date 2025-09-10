import { useState, useCallback } from 'react';
import { apiService } from '@/lib/api';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (
    apiCall: () => Promise<any>,
    options: UseApiOptions = {}
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall();
      
      if (response.success) {
        options.onSuccess?.(response.data);
        return response.data;
      } else {
        const errorMessage = response.message || 'Something went wrong';
        setError(errorMessage);
        options.onError?.(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Network error';
      setError(errorMessage);
      options.onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Template methods
  const getTemplates = useCallback((params?: any, options?: UseApiOptions) => {
    return request(() => apiService.getTemplates(params), options);
  }, [request]);

  const getTemplate = useCallback((id: string, options?: UseApiOptions) => {
    return request(() => apiService.getTemplate(id), options);
  }, [request]);

  // Project methods
  const getProjects = useCallback((params?: any, options?: UseApiOptions) => {
    return request(() => apiService.getProjects(params), options);
  }, [request]);

  const createProject = useCallback((data: any, options?: UseApiOptions) => {
    return request(() => apiService.createProject(data), options);
  }, [request]);

  const updateProject = useCallback((id: string, data: any, options?: UseApiOptions) => {
    return request(() => apiService.updateProject(id, data), options);
  }, [request]);

  const deleteProject = useCallback((id: string, options?: UseApiOptions) => {
    return request(() => apiService.deleteProject(id), options);
  }, [request]);

  // File methods
  const uploadFile = useCallback((file: File, options?: UseApiOptions) => {
    return request(() => apiService.uploadFile(file), options);
  }, [request]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    clearError,
    getTemplates,
    getTemplate,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadFile,
  };
};

export default useApi;