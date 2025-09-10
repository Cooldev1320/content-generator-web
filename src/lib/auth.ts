import { apiService } from './api';
import { User } from '@/types/auth';

export class AuthManager {
  private static instance: AuthManager;
  private user: User | null = null;
  private token: string | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User | null {
    return this.user;
  }

  clearUser(): void {
    this.user = null;
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  async loadUser(): Promise<User | null> {
    if (!this.token) return null;

    try {
      const response = await apiService.getProfile();
      if (response.success && response.data) {
        this.setUser(response.data);
        return response.data;
      }
    } catch (error) {
      this.clearToken();
      this.clearUser();
    }

    return null;
  }

  hasPermission(permission: string): boolean {
    if (!this.user) return false;

    // Basic permission checks based on subscription tier
    switch (permission) {
      case 'premium_templates':
        return this.user.subscriptionTier !== 'Free';
      case 'unlimited_exports':
        return this.user.subscriptionTier === 'Premium';
      case 'team_collaboration':
        return this.user.subscriptionTier === 'Premium';
      case 'custom_branding':
        return this.user.subscriptionTier === 'Premium';
      case 'priority_support':
        return this.user.subscriptionTier !== 'Free';
      default:
        return true;
    }
  }

  canExport(): boolean {
    if (!this.user) return false;
    
    if (this.user.subscriptionTier === 'Premium') {
      return true; // Unlimited exports
    }
    
    return this.user.monthlyExportsUsed < this.user.monthlyExportsLimit;
  }

  getRemainingExports(): number {
    if (!this.user) return 0;
    
    if (this.user.subscriptionTier === 'Premium') {
      return -1; // Unlimited
    }
    
    return Math.max(0, this.user.monthlyExportsLimit - this.user.monthlyExportsUsed);
  }
}

export const authManager = AuthManager.getInstance();