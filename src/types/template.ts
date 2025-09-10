import { CanvasElement } from './canvas';

export interface Template {
    id: string;
    name: string;
    description?: string;
    category: string;
    tags: string[];
    thumbnail: string;
    width: number;
    height: number;
    isPremium: boolean;
    isPublic: boolean;
    isFeatured: boolean;
    downloadCount: number;
    rating: number;
    ratingCount: number;
    authorId: string;
    authorName: string;
    createdAt: string;
    updatedAt: string;
    elements: CanvasElement[];
    previewUrl?: string;
  }
  
  export interface TemplateCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    templateCount: number;
    isActive: boolean;
    sortOrder: number;
  }
  
  export interface TemplateFilter {
    category?: string;
    tags?: string[];
    isPremium?: boolean;
    isFeatured?: boolean;
    minRating?: number;
    search?: string;
    sortBy?: 'newest' | 'oldest' | 'popular' | 'rating' | 'downloads';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }
  
  export interface TemplateCreateRequest {
    name: string;
    description?: string;
    category: string;
    tags: string[];
    width: number;
    height: number;
    isPublic: boolean;
    elements: CanvasElement[];
    thumbnail?: File;
  }
  
  export interface TemplateUpdateRequest extends Partial<TemplateCreateRequest> {
    id: string;
  }