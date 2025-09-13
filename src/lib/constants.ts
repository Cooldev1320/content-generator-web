export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7000';

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REFRESH: '/api/auth/refresh',
  AUTH_PROFILE: '/api/auth/profile',
  AUTH_CHANGE_PASSWORD: '/api/auth/change-password',
  
  // Users
  USERS_ME: '/api/users/me',
  USERS_UPDATE_SUBSCRIPTION: '/api/users/subscription',
  
  // Projects
  PROJECTS: '/api/projects',
  PROJECTS_RECENT: '/api/projects/recent',
  PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,
  PROJECT_DUPLICATE: (id: string) => `/api/projects/${id}/duplicate`,
  PROJECT_EXPORT: (id: string) => `/api/projects/${id}/export`,
  PROJECT_THUMBNAIL: (id: string) => `/api/projects/${id}/thumbnail`,
  
  // Templates
  TEMPLATES: '/api/templates',
  TEMPLATES_FEATURED: '/api/templates/featured',
  TEMPLATES_BY_CATEGORY: (category: string) => `/api/templates/category/${category}`,
  TEMPLATE_BY_ID: (id: string) => `/api/templates/${id}`,
  
  // Files
  FILES_UPLOAD: '/api/files/upload',
  FILES_AVATAR: '/api/files/avatar',
  FILES_THUMBNAIL: '/api/files/thumbnail',
  FILES_LIST: '/api/files',
  FILES_DELETE: '/api/files',
  FILES_SIGNED_URL: '/api/files/signed-url',
  
  // History
  HISTORY: '/api/history',
  HISTORY_RECENT: '/api/history/recent',
};

export const CANVAS_DEFAULTS = {
  WIDTH: 1080,
  HEIGHT: 1080,
  BACKGROUND_COLOR: '#ffffff',
  ZOOM_STEP: 0.1,
  MIN_ZOOM: 0.1,
  MAX_ZOOM: 5,
  GRID_SIZE: 20,
};

export const SUBSCRIPTION_LIMITS = {
  Free: {
    monthlyExports: 10,
    storageLimit: 100, // MB
    premiumTemplates: false,
  },
  Pro: {
    monthlyExports: 100,
    storageLimit: 1000, // MB
    premiumTemplates: true,
  },
  Premium: {
    monthlyExports: 1000,
    storageLimit: 10000, // MB
    premiumTemplates: true,
  },
};

export const TEMPLATE_CATEGORIES = [
  { id: 'social-media', name: 'Social Media', slug: 'social-media' },
  { id: 'marketing', name: 'Marketing', slug: 'marketing' },
  { id: 'presentations', name: 'Presentations', slug: 'presentations' },
  { id: 'logos', name: 'Logos', slug: 'logos' },
  { id: 'banners', name: 'Banners', slug: 'banners' },
  { id: 'flyers', name: 'Flyers', slug: 'flyers' },
  { id: 'business-cards', name: 'Business Cards', slug: 'business-cards' },
  { id: 'invitations', name: 'Invitations', slug: 'invitations' },
];

export const EXPORT_FORMATS = {
  PNG: { format: 'png', extension: '.png', mimeType: 'image/png' },
  JPG: { format: 'jpg', extension: '.jpg', mimeType: 'image/jpeg' },
  SVG: { format: 'svg', extension: '.svg', mimeType: 'image/svg+xml' },
  PDF: { format: 'pdf', extension: '.pdf', mimeType: 'application/pdf' },
};

export const FILE_UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  AVATAR_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  THUMBNAIL_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  AVATAR_TYPES: ['image/jpeg', 'image/png'],
};

export const PROJECT_STATUS = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
} as const;

export const HISTORY_ACTIONS = {
  PROJECT_CREATED: 'ProjectCreated',
  PROJECT_UPDATED: 'ProjectUpdated',
  PROJECT_DELETED: 'ProjectDeleted',
  PROJECT_EXPORTED: 'ProjectExported',
  PROJECT_DUPLICATED: 'ProjectDuplicated',
  TEMPLATE_USED: 'TemplateUsed',
} as const;