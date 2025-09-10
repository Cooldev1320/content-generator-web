import { CanvasElement } from './canvas';

export interface Project {
    id: string;
    name: string;
    description?: string;
    width: number;
    height: number;
    thumbnail?: string;
    isPublic: boolean;
    status: 'draft' | 'completed' | 'archived';
    templateId?: string;
    templateName?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    lastModified: string;
    version: number;
    elements: CanvasElement[];
    settings: {
      backgroundColor: string;
      gridVisible: boolean;
      snapToGrid: boolean;
      gridSize: number;
    };
  }
  
  export interface ProjectCreateRequest {
    name: string;
    description?: string;
    width: number;
    height: number;
    templateId?: string;
    isPublic?: boolean;
    elements?: CanvasElement[];
  }
  
  export interface ProjectUpdateRequest {
    name?: string;
    description?: string;
    isPublic?: boolean;
    status?: 'draft' | 'completed' | 'archived';
    elements?: CanvasElement[];
    settings?: Project['settings'];
  }
  
  export interface ProjectExportRequest {
    format: 'png' | 'jpg' | 'svg' | 'pdf';
    quality?: number;
    scale?: number;
    transparent?: boolean;
    includeBackground?: boolean;
  }
  
  export interface ProjectFilter {
    status?: 'draft' | 'completed' | 'archived';
    search?: string;
    sortBy?: 'name' | 'created' | 'modified' | 'status';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }