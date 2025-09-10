export interface CanvasElement {
    id: string;
    type: 'text' | 'rectangle' | 'circle' | 'image' | 'line';
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    rotation?: number;
    opacity?: number;
    visible: boolean;
    locked: boolean;
    zIndex: number;
    
    // Text properties
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number;
    textAlign?: 'left' | 'center' | 'right';
    lineHeight?: number;
    
    // Style properties
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeDashArray?: number[];
    
    // Image properties
    src?: string;
    cropX?: number;
    cropY?: number;
    cropWidth?: number;
    cropHeight?: number;
    
    // Animation properties
    animation?: {
      type: string;
      duration: number;
      delay: number;
      easing: string;
    };
  }
  
  export interface CanvasState {
    elements: CanvasElement[];
    selectedElementIds: string[];
    canvasWidth: number;
    canvasHeight: number;
    zoom: number;
    panX: number;
    panY: number;
    backgroundColor: string;
    gridVisible: boolean;
    snapToGrid: boolean;
    gridSize: number;
  }
  
  export interface CanvasHistory {
    past: CanvasState[];
    present: CanvasState;
    future: CanvasState[];
  }
  
  export interface CanvasExportOptions {
    format: 'png' | 'jpg' | 'svg' | 'pdf';
    quality: number;
    scale: number;
    transparent: boolean;
    includeBackground: boolean;
  }
  
  export interface CanvasToolState {
    activeTool: 'select' | 'text' | 'rectangle' | 'circle' | 'image' | 'line' | 'pan' | 'zoom';
    isDrawing: boolean;
    startPoint?: { x: number; y: number };
    currentPoint?: { x: number; y: number };
  }