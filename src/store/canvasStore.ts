import { create } from 'zustand';
import type { CanvasElement, CanvasState } from '@/types';
import { generateId } from '@/lib/utils';
import { CANVAS_DEFAULTS } from '@/lib/constants';

interface CanvasStoreState extends CanvasState {
  // History
  history: CanvasState[];
  historyIndex: number;
  
  // UI State
  isDirty: boolean;
  selectedTool: string;
  isLoading: boolean;
}

interface CanvasStoreActions {
  // Canvas Management
  setCanvasSize: (width: number, height: number) => void;
  setBackgroundColor: (color: string) => void;
  setZoom: (zoom: number) => void;
  
  // Element Management
  addElement: (element: Omit<CanvasElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  
  // Selection Management
  selectElement: (id: string, multiSelect?: boolean) => void;
  selectElements: (ids: string[]) => void;
  clearSelection: () => void;
  selectAll: () => void;
  
  // Layer Management
  moveElementUp: (id: string) => void;
  moveElementDown: (id: string) => void;
  moveElementToTop: (id: string) => void;
  moveElementToBottom: (id: string) => void;
  
  // History Management
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  saveState: () => void;
  
  // Tool Management
  setSelectedTool: (tool: string) => void;
  
  // State Management
  resetCanvas: () => void;
  loadCanvasState: (state: Partial<CanvasState>) => void;
  setLoading: (loading: boolean) => void;
  markClean: () => void;
}

type CanvasStore = CanvasStoreState & CanvasStoreActions;

const initialCanvasState: CanvasState = {
  elements: [],
  selectedElementIds: [],
  width: CANVAS_DEFAULTS.WIDTH,
  height: CANVAS_DEFAULTS.HEIGHT,
  backgroundColor: CANVAS_DEFAULTS.BACKGROUND_COLOR,
  zoom: 1,
};

const initialState: CanvasStoreState = {
  ...initialCanvasState,
  history: [initialCanvasState],
  historyIndex: 0,
  isDirty: false,
  selectedTool: 'select',
  isLoading: false,
};

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  ...initialState,

  // Canvas Management
  setCanvasSize: (width: number, height: number) => {
    set((state) => ({ ...state, width, height, isDirty: true }));
    get().saveState();
  },

  setBackgroundColor: (color: string) => {
    set((state) => ({ ...state, backgroundColor: color, isDirty: true }));
    get().saveState();
  },

  setZoom: (zoom: number) => {
    set((state) => ({ ...state, zoom }));
  },

  // Element Management
  addElement: (elementData) => {
    const element: CanvasElement = {
      id: generateId(),
      ...elementData,
    };

    set((state) => ({
      ...state,
      elements: [...state.elements, element],
      selectedElementIds: [element.id],
      isDirty: true,
    }));
    get().saveState();
  },

  updateElement: (id: string, updates: Partial<CanvasElement>) => {
    set((state) => ({
      ...state,
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
      isDirty: true,
    }));
    get().saveState();
  },

  removeElement: (id: string) => {
    set((state) => ({
      ...state,
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementIds: state.selectedElementIds.filter((selectedId) => selectedId !== id),
      isDirty: true,
    }));
    get().saveState();
  },

  duplicateElement: (id: string) => {
    const state = get();
    const element = state.elements.find((el) => el.id === id);
    
    if (element) {
      const duplicatedElement: CanvasElement = {
        ...element,
        id: generateId(),
        left: element.left + 20,
        top: element.top + 20,
      };

      set((prevState) => ({
        ...prevState,
        elements: [...prevState.elements, duplicatedElement],
        selectedElementIds: [duplicatedElement.id],
        isDirty: true,
      }));
      get().saveState();
    }
  },

  // Selection Management
  selectElement: (id: string, multiSelect = false) => {
    set((state) => ({
      ...state,
      selectedElementIds: multiSelect
        ? state.selectedElementIds.includes(id)
          ? state.selectedElementIds.filter((selectedId) => selectedId !== id)
          : [...state.selectedElementIds, id]
        : [id],
    }));
  },

  selectElements: (ids: string[]) => {
    set((state) => ({ ...state, selectedElementIds: ids }));
  },

  clearSelection: () => {
    set((state) => ({ ...state, selectedElementIds: [] }));
  },

  selectAll: () => {
    const state = get();
    set((prevState) => ({
      ...prevState,
      selectedElementIds: prevState.elements.map((el) => el.id),
    }));
  },

  // Layer Management
  moveElementUp: (id: string) => {
    set((state) => {
      const elements = [...state.elements];
      const index = elements.findIndex((el) => el.id === id);
      
      if (index < elements.length - 1) {
        [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]];
      }
      
      return { ...state, elements, isDirty: true };
    });
    get().saveState();
  },

  moveElementDown: (id: string) => {
    set((state) => {
      const elements = [...state.elements];
      const index = elements.findIndex((el) => el.id === id);
      
      if (index > 0) {
        [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]];
      }
      
      return { ...state, elements, isDirty: true };
    });
    get().saveState();
  },

  moveElementToTop: (id: string) => {
    set((state) => {
      const elements = [...state.elements];
      const index = elements.findIndex((el) => el.id === id);
      
      if (index !== -1) {
        const element = elements.splice(index, 1)[0];
        elements.push(element);
      }
      
      return { ...state, elements, isDirty: true };
    });
    get().saveState();
  },

  moveElementToBottom: (id: string) => {
    set((state) => {
      const elements = [...state.elements];
      const index = elements.findIndex((el) => el.id === id);
      
      if (index !== -1) {
        const element = elements.splice(index, 1)[0];
        elements.unshift(element);
      }
      
      return { ...state, elements, isDirty: true };
    });
    get().saveState();
  },

  // History Management
  saveState: () => {
    const state = get();
    const canvasState: CanvasState = {
      elements: state.elements,
      selectedElementIds: state.selectedElementIds,
      width: state.width,
      height: state.height,
      backgroundColor: state.backgroundColor,
      zoom: state.zoom,
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(canvasState);

    // Limit history size
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      set((prevState) => ({
        ...prevState,
        historyIndex: prevState.historyIndex + 1,
      }));
    }

    set((prevState) => ({ ...prevState, history: newHistory }));
  },

  undo: () => {
    const state = get();
    
    if (state.historyIndex > 0) {
      const previousState = state.history[state.historyIndex - 1];
      set({
        ...state,
        ...previousState,
        historyIndex: state.historyIndex - 1,
        isDirty: true,
      });
    }
  },

  redo: () => {
    const state = get();
    
    if (state.historyIndex < state.history.length - 1) {
      const nextState = state.history[state.historyIndex + 1];
      set({
        ...state,
        ...nextState,
        historyIndex: state.historyIndex + 1,
        isDirty: true,
      });
    }
  },

  canUndo: () => {
    const state = get();
    return state.historyIndex > 0;
  },

  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },

  // Tool Management
  setSelectedTool: (tool: string) => {
    set((state) => ({ ...state, selectedTool: tool }));
  },

  // State Management
  resetCanvas: () => {
    set(initialState);
  },

  loadCanvasState: (canvasState: Partial<CanvasState>) => {
    const newState = { ...initialCanvasState, ...canvasState };
    set((state) => ({
      ...state,
      ...newState,
      history: [newState],
      historyIndex: 0,
      isDirty: false,
    }));
  },

  setLoading: (loading: boolean) => {
    set((state) => ({ ...state, isLoading: loading }));
  },

  markClean: () => {
    set((state) => ({ ...state, isDirty: false }));
  },
}));