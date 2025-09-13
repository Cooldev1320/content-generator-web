// User & Auth Types
export interface User {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    avatarUrl?: string;
    subscriptionTier: 'Free' | 'Pro' | 'Premium';
    monthlyExportsUsed: number;
    monthlyExportsLimit: number;
    storageUsed: number;
    storageLimit: number;
    isActive: boolean;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName?: string;
    acceptTerms: boolean;
  }
  
  export interface AuthResponse {
    success: boolean;
    message?: string;
    data?: {
      accessToken: string;
      refreshToken: string;
      expiresAt: string;
      user: User;
    };
    errors?: string[];
  }
  
  // API Response Types
  export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: string[];
  }
  
  export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
  
  // Project Types
  export interface Project {
    id: string;
    name: string;
    description?: string;
    thumbnailUrl?: string;
    templateId?: string;
    templateName?: string;
    canvasData: any;
    width: number;
    height: number;
    status: 'Draft' | 'Published' | 'Archived';
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProjectListDto {
    id: string;
    name: string;
    thumbnailUrl?: string;
    templateName?: string;
    status: string;
    updatedAt: string;
    createdAt: string;
  }
  
  export interface CreateProjectRequest {
    name: string;
    templateId?: string;
    canvasData?: any;
    width?: number;
    height?: number;
  }
  
  export interface UpdateProjectRequest {
    name?: string;
    canvasData?: any;
    thumbnailUrl?: string;
    width?: number;
    height?: number;
    status?: string;
  }
  
  // Template Types
  export interface Template {
    id: string;
    name: string;
    description?: string;
    category: string;
    thumbnailUrl: string;
    templateData: any;
    width: number;
    height: number;
    isPremium: boolean;
    isActive: boolean;
    downloadCount: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TemplateListDto {
    id: string;
    name: string;
    description?: string;
    category: string;
    thumbnailUrl: string;
    isPremium: boolean;
    downloadCount: number;
  }
  
  // History Types
  export interface HistoryItem {
    id: string;
    actionType: string;
    description: string;
    projectId?: string;
    projectName?: string;
    metadata?: any;
    createdAt: string;
  }
  
  // Canvas Types
  export interface CanvasElement {
    id: string;
    type: 'text' | 'image' | 'rectangle' | 'circle' | 'line';
    left: number;
    top: number;
    width?: number;
    height?: number;
    angle?: number;
    scaleX?: number;
    scaleY?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    visible?: boolean;
    selectable?: boolean;
    
    // Text specific
    text?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string | number;
    fontStyle?: string;
    textAlign?: string;
    lineHeight?: number;
    
    // Image specific
    src?: string;
    crossOrigin?: string;
  }
  
  export interface CanvasState {
    elements: CanvasElement[];
    selectedElementIds: string[];
    width: number;
    height: number;
    backgroundColor: string;
    zoom: number;
  }
  
  // File Types
  export interface FileUploadResponse {
    success: boolean;
    data?: {
      url: string;
      filename: string;
      size: number;
    };
    errors?: string[];
  }
  
  // Export Types
  export interface ExportRequest {
    projectId: string;
    format: 'png' | 'jpg' | 'svg' | 'pdf';
    quality?: number;
    includeWatermark?: boolean;
  }
  
  export interface ExportResponse {
    success: boolean;
    data?: {
      downloadUrl: string;
      expiresAt: string;
    };
    errors?: string[];
  }