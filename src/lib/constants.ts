export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      PROFILE: '/api/auth/profile',
      REFRESH: '/api/auth/refresh',
      CHANGE_PASSWORD: '/api/auth/change-password',
    },
    PROJECTS: {
      LIST: '/api/projects',
      CREATE: '/api/projects',
      GET: (id: string) => `/api/projects/${id}`,
      UPDATE: (id: string) => `/api/projects/${id}`,
      DELETE: (id: string) => `/api/projects/${id}`,
      RECENT: '/api/projects/recent',
      DUPLICATE: (id: string) => `/api/projects/${id}/duplicate`,
      EXPORT: (id: string) => `/api/projects/${id}/export`,
      THUMBNAIL: (id: string) => `/api/projects/${id}/thumbnail`,
    },
    TEMPLATES: {
      LIST: '/api/templates',
      CREATE: '/api/templates',
      GET: (id: string) => `/api/templates/${id}`,
      UPDATE: (id: string) => `/api/templates/${id}`,
      DELETE: (id: string) => `/api/templates/${id}`,
      FEATURED: '/api/templates/featured',
      CATEGORY: (category: string) => `/api/templates/category/${category}`,
      TOGGLE_STATUS: (id: string) => `/api/templates/${id}/toggle-status`,
    },
    FILES: {
      UPLOAD: '/api/files/upload',
      AVATAR: '/api/files/avatar',
      THUMBNAIL: (projectId: string) => `/api/files/thumbnail/${projectId}`,
      LIST: '/api/files',
      DELETE: '/api/files',
      SIGNED_URL: '/api/files/signed-url',
    },
    HISTORY: {
      LIST: '/api/history',
      DELETE: '/api/history',
      RECENT: '/api/history/recent',
    },
    USERS: {
      ME: '/api/users/me',
      UPDATE_ME: '/api/users/me',
      SUBSCRIPTION: '/api/users/subscription',
      RESET_EXPORTS: (userId: string) => `/api/users/${userId}/reset-exports`,
      GET_USER: (userId: string) => `/api/users/${userId}`,
    },
  } as const;
  
  export const SUBSCRIPTION_TIERS = {
    FREE: {
      name: 'Free',
      monthlyExports: 5,
      storageLimit: 1024 * 1024 * 100, // 100MB
      premiumTemplates: false,
      prioritySupport: false,
      customBranding: false,
      teamCollaboration: false,
      price: 0,
    },
    PRO: {
      name: 'Pro',
      monthlyExports: 100,
      storageLimit: 1024 * 1024 * 1024 * 5, // 5GB
      premiumTemplates: true,
      prioritySupport: true,
      customBranding: false,
      teamCollaboration: false,
      price: 9.99,
    },
    PREMIUM: {
      name: 'Premium',
      monthlyExports: -1, // Unlimited
      storageLimit: 1024 * 1024 * 1024 * 50, // 50GB
      premiumTemplates: true,
      prioritySupport: true,
      customBranding: true,
      teamCollaboration: true,
      price: 29.99,
    },
  } as const;
  
  export const CANVAS_DEFAULTS = {
    WIDTH: 800,
    HEIGHT: 600,
    ZOOM_MIN: 0.1,
    ZOOM_MAX: 5,
    ZOOM_STEP: 0.1,
    GRID_SIZE: 20,
    BACKGROUND_COLOR: '#ffffff',
  } as const;
  
  export const EXPORT_FORMATS = {
    PNG: { extension: 'png', mimeType: 'image/png', quality: false },
    JPG: { extension: 'jpg', mimeType: 'image/jpeg', quality: true },
    SVG: { extension: 'svg', mimeType: 'image/svg+xml', quality: false },
    PDF: { extension: 'pdf', mimeType: 'application/pdf', quality: false },
  } as const;
  
  export const ELEMENT_TYPES = {
    TEXT: 'text',
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    IMAGE: 'image',
    LINE: 'line',
  } as const;
  
  export const KEYBOARD_SHORTCUTS = {
    UNDO: ['cmd+z', 'ctrl+z'],
    REDO: ['cmd+shift+z', 'ctrl+y'],
    COPY: ['cmd+c', 'ctrl+c'],
    PASTE: ['cmd+v', 'ctrl+v'],
    DELETE: ['delete', 'backspace'],
    SELECT_ALL: ['cmd+a', 'ctrl+a'],
    SAVE: ['cmd+s', 'ctrl+s'],
    EXPORT: ['cmd+e', 'ctrl+e'],
    ZOOM_IN: ['cmd+=', 'ctrl+='],
    ZOOM_OUT: ['cmd+-', 'ctrl+-'],
    ZOOM_FIT: ['cmd+0', 'ctrl+0'],
  } as const;
  
  export const FILE_TYPES = {
    IMAGES: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg'],
    },
    FONTS: {
      'font/woff': ['.woff'],
      'font/woff2': ['.woff2'],
      'font/ttf': ['.ttf'],
      'font/otf': ['.otf'],
    },
  } as const;
  
  export const MAX_FILE_SIZE = {
    IMAGE: 10 * 1024 * 1024, // 10MB
    FONT: 5 * 1024 * 1024, // 5MB
    AVATAR: 2 * 1024 * 1024, // 2MB
  } as const;
  
  export const TEMPLATE_CATEGORIES = [
    'Instagram Post',
    'Instagram Story',
    'Facebook Post',
    'Facebook Cover',
    'Twitter Header',
    'LinkedIn Post',
    'YouTube Thumbnail',
    'Business Card',
    'Flyer',
    'Poster',
    'Logo',
    'Presentation',
    'Resume',
    'Invoice',
    'Certificate',
    'Other',
  ] as const;
  
  export const CANVAS_TOOLS = [
    { id: 'select', name: 'Select', icon: '👆', shortcut: 'v' },
    { id: 'text', name: 'Text', icon: '📝', shortcut: 't' },
    { id: 'rectangle', name: 'Rectangle', icon: '⬜', shortcut: 'r' },
    { id: 'circle', name: 'Circle', icon: '⭕', shortcut: 'c' },
    { id: 'image', name: 'Image', icon: '🖼️', shortcut: 'i' },
    { id: 'line', name: 'Line', icon: '📏', shortcut: 'l' },
    { id: 'pan', name: 'Pan', icon: '✋', shortcut: 'h' },
    { id: 'zoom', name: 'Zoom', icon: '🔍', shortcut: 'z' },
  ] as const;