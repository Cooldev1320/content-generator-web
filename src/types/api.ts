import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthResponse, LoginCredentials, RegisterData } from '@/types/auth';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use((config) => {
      const token = this.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearAuthToken();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Auth methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/auth/login', credentials);
    
    if (response.data.success && response.data.data?.accessToken) {
      this.setAuthToken(response.data.data.accessToken);
    }
    
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/auth/register', data);
    
    if (response.data.success && response.data.data?.accessToken) {
      this.setAuthToken(response.data.data.accessToken);
    }
    
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/api/auth/logout');
    } finally {
      this.clearAuthToken();
    }
  }

  async getProfile(): Promise<any> {
    const response = await this.api.get('/api/auth/profile');
    return response.data;
  }

  // Template methods
  async getTemplates(params?: any): Promise<any> {
    const response = await this.api.get('/api/templates', { params });
    return response.data;
  }

  async getTemplate(id: string): Promise<any> {
    const response = await this.api.get(`/api/templates/${id}`);
    return response.data;
  }

  // Project methods
  async getProjects(params?: any): Promise<any> {
    const response = await this.api.get('/api/projects', { params });
    return response.data;
  }

  async createProject(data: any): Promise<any> {
    const response = await this.api.post('/api/projects', data);
    return response.data;
  }

  async updateProject(id: string, data: any): Promise<any> {
    const response = await this.api.put(`/api/projects/${id}`, data);
    return response.data;
  }

  async deleteProject(id: string): Promise<any> {
    const response = await this.api.delete(`/api/projects/${id}`);
    return response.data;
  }

  // File methods
  async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await this.api.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
}

export const apiService = new ApiService();