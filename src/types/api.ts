export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  id: string;
}

export interface HistoryItem {
  id: string;
  action: string;
  resourceType: 'project' | 'template' | 'file';
  resourceId: string;
  resourceName: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  bio?: string;
  website?: string;
  location?: string;
  subscriptionTier: 'Free' | 'Pro' | 'Premium';
  subscriptionExpiresAt?: string;
  monthlyExportsUsed: number;
  monthlyExportsLimit: number;
  storageUsed: number;
  storageLimit: number;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface SubscriptionInfo {
  tier: 'Free' | 'Pro' | 'Premium';
  status: 'active' | 'canceled' | 'expired';
  expiresAt?: string;
  features: {
    monthlyExports: number;
    storageLimit: number;
    premiumTemplates: boolean;
    prioritySupport: boolean;
    customBranding: boolean;
    teamCollaboration: boolean;
  };
}