import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import { getErrorMessage } from './utils';
import type {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  Project,
  ProjectListDto,
  CreateProjectRequest,
  UpdateProjectRequest,
  Template,
  TemplateListDto,
  PagedResult,
  HistoryItem,
  ExportRequest,
  ExportResponse,
  FileUploadResponse,
} from '@/types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          const refreshToken = this.getRefreshToken();
          if (refreshToken) {
            try {
              const response = await this.refreshToken(refreshToken);
              if (response.success && response.data) {
                this.setTokens(response.data.accessToken, response.data.refreshToken);
                // Retry the original request
                const originalConfig = error.config;
                originalConfig.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return this.client(originalConfig);
              }
            } catch (refreshError) {
              this.clearTokens();
              window.location.href = '/login';
            }
          } else {
            this.clearTokens();
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }

  // Auth Methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>(
        API_ENDPOINTS.AUTH_LOGIN,
        credentials
      );
      
      if (response.data.success && response.data.data) {
        this.setTokens(response.data.data.accessToken, response.data.data.refreshToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>(
        API_ENDPOINTS.AUTH_REGISTER,
        data
      );
      
      if (response.data.success && response.data.data) {
        this.setTokens(response.data.data.accessToken, response.data.data.refreshToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async logout(): Promise<void> {
    try {
      await this.client.post(API_ENDPOINTS.AUTH_LOGOUT);
    } catch (error) {
      // Ignore logout errors
    } finally {
      this.clearTokens();
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>(
      API_ENDPOINTS.AUTH_REFRESH,
      { refreshToken }
    );
    return response.data;
  }

  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.get<ApiResponse<User>>(
        API_ENDPOINTS.AUTH_PROFILE
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.put<ApiResponse<User>>(
        API_ENDPOINTS.AUTH_PROFILE,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<ApiResponse> {
    try {
      const response = await this.client.post<ApiResponse>(
        API_ENDPOINTS.AUTH_CHANGE_PASSWORD,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  // Project Methods
  async getProjects(params?: {
    status?: string;
    templateId?: string;
    searchTerm?: string;
    createdAfter?: string;
    createdBefore?: string;
    sortBy?: string;
    sortDescending?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PagedResult<ProjectListDto>>> {
    try {
      const response = await this.client.get<ApiResponse<PagedResult<ProjectListDto>>>(
        API_ENDPOINTS.PROJECTS,
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const response = await this.client.get<ApiResponse<Project>>(
        API_ENDPOINTS.PROJECT_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getRecentProjects(count: number = 5): Promise<ApiResponse<ProjectListDto[]>> {
    try {
      const response = await this.client.get<ApiResponse<ProjectListDto[]>>(
        API_ENDPOINTS.PROJECTS_RECENT,
        { params: { count } }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async createProject(data: CreateProjectRequest): Promise<ApiResponse<Project>> {
    try {
      const response = await this.client.post<ApiResponse<Project>>(
        API_ENDPOINTS.PROJECTS,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateProject(id: string, data: UpdateProjectRequest): Promise<ApiResponse<Project>> {
    try {
      const response = await this.client.put<ApiResponse<Project>>(
        API_ENDPOINTS.PROJECT_BY_ID(id),
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteProject(id: string): Promise<ApiResponse> {
    try {
      const response = await this.client.delete<ApiResponse>(
        API_ENDPOINTS.PROJECT_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async duplicateProject(id: string, newName: string): Promise<ApiResponse<Project>> {
    try {
      const response = await this.client.post<ApiResponse<Project>>(
        API_ENDPOINTS.PROJECT_DUPLICATE(id),
        { newName }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async exportProject(id: string, data: ExportRequest): Promise<ExportResponse> {
    try {
      const response = await this.client.post<ExportResponse>(
        API_ENDPOINTS.PROJECT_EXPORT(id),
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  // Template Methods
  async getTemplates(params?: {
    category?: string;
    isPremium?: boolean;
    isActive?: boolean;
    searchTerm?: string;
    sortBy?: string;
    sortDescending?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PagedResult<TemplateListDto>>> {
    try {
      const response = await this.client.get<ApiResponse<PagedResult<TemplateListDto>>>(
        API_ENDPOINTS.TEMPLATES,
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getTemplate(id: string): Promise<ApiResponse<Template>> {
    try {
      const response = await this.client.get<ApiResponse<Template>>(
        API_ENDPOINTS.TEMPLATE_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getFeaturedTemplates(count: number = 10): Promise<ApiResponse<TemplateListDto[]>> {
    try {
      const response = await this.client.get<ApiResponse<TemplateListDto[]>>(
        API_ENDPOINTS.TEMPLATES_FEATURED,
        { params: { count } }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getTemplatesByCategory(category: string, count: number = 20): Promise<ApiResponse<TemplateListDto[]>> {
    try {
      const response = await this.client.get<ApiResponse<TemplateListDto[]>>(
        API_ENDPOINTS.TEMPLATES_BY_CATEGORY(category),
        { params: { count } }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  // File Methods
  async uploadFile(file: File): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post<FileUploadResponse>(
        API_ENDPOINTS.FILES_UPLOAD,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async uploadAvatar(file: File): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post<FileUploadResponse>(
        API_ENDPOINTS.FILES_AVATAR,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async uploadThumbnail(projectId: string, file: File): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post<FileUploadResponse>(
        `${API_ENDPOINTS.FILES_THUMBNAIL}/${projectId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getUserFiles(): Promise<ApiResponse<string[]>> {
    try {
      const response = await this.client.get<ApiResponse<string[]>>(
        API_ENDPOINTS.FILES_LIST
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteFile(fileUrl: string): Promise<ApiResponse> {
    try {
      const response = await this.client.delete<ApiResponse>(
        API_ENDPOINTS.FILES_DELETE,
        { params: { fileUrl } }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  // History Methods
  async getHistory(params?: {
    actionType?: string;
    projectId?: string;
    fromDate?: string;
    toDate?: string;
    sortBy?: string;
    sortDescending?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PagedResult<HistoryItem>>> {
    try {
      const response = await this.client.get<ApiResponse<PagedResult<HistoryItem>>>(
        API_ENDPOINTS.HISTORY,
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getRecentHistory(count: number = 10): Promise<ApiResponse<HistoryItem[]>> {
    try {
      const response = await this.client.get<ApiResponse<HistoryItem[]>>(
        API_ENDPOINTS.HISTORY_RECENT,
        { params: { count } }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async clearHistory(olderThan?: string): Promise<ApiResponse> {
    try {
      const response = await this.client.delete<ApiResponse>(
        API_ENDPOINTS.HISTORY,
        { params: { olderThan } }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;