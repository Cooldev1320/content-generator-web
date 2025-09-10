import { useState, useCallback, useRef } from 'react';
import { CanvasElement, CanvasState, CanvasHistory, CanvasToolState } from '@/types/canvas';

const initialCanvasState: CanvasState = {
  elements: [],
  selectedElementIds: [],
  canvasWidth: 800,
  canvasHeight: 600,
  zoom: 1,
  panX: 0,
  panY: 0,
  backgroundColor: '#ffffff',
  gridVisible: true,
  snapToGrid: false,
  gridSize: 20,
};

const initialToolState: CanvasToolState = {
  activeTool: 'select',
  isDrawing: false,
};

export const useCanvas = (initialState?: Partial<CanvasState>) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    ...initialCanvasState,
    ...initialState,
  });
  
  const [toolState, setToolState] = useState<CanvasToolState>(initialToolState);
  const [history, setHistory] = useState<CanvasHistory>({
    past: [],
    present: canvasState,
    future: [],
  });

  const historyRef = useRef(history);
  historyRef.current = history;

  // History management
  const pushToHistory = useCallback((newState: CanvasState) => {
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: newState,
      future: [],
    }));
  }, []);

  const undo = useCallback(() => {
    if (history.past.length === 0) return;
    
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    
    setHistory({
      past: newPast,
      present: previous,
      future: [history.present, ...history.future],
    });
    
    setCanvasState(previous);
  }, [history]);

  const redo = useCallback(() => {
    if (history.future.length === 0) return;
    
    const next = history.future[0];
    const newFuture = history.future.slice(1);
    
    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: newFuture,
    });
    
    setCanvasState(next);
  }, [history]);

  // Element management
  const addElement = useCallback((element: Omit<CanvasElement, 'id' | 'zIndex'>) => {
    const newElement: CanvasElement = {
      ...element,
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      zIndex: canvasState.elements.length,
    };
    
    const newState = {
      ...canvasState,
      elements: [...canvasState.elements, newElement],
      selectedElementIds: [newElement.id],
    };
    
    setCanvasState(newState);
    pushToHistory(newState);
  }, [canvasState, pushToHistory]);

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    const newState = {
      ...canvasState,
      elements: canvasState.elements.map(el =>
        el.id === id ? { ...el, ...updates } : el
      ),
    };
    
    setCanvasState(newState);
    pushToHistory(newState);
  }, [canvasState, pushToHistory]);

  const deleteElement = useCallback((id: string) => {
    const newState = {
      ...canvasState,
      elements: canvasState.elements.filter(el => el.id !== id),
      selectedElementIds: canvasState.selectedElementIds.filter(selectedId => selectedId !== id),
    };
    
    setCanvasState(newState);
    pushToHistory(newState);
  }, [canvasState, pushToHistory]);

  const selectElement = useCallback((id: string, multiSelect = false) => {
    let newSelectedIds: string[];
    
    if (multiSelect) {
      newSelectedIds = canvasState.selectedElementIds.includes(id)
        ? canvasState.selectedElementIds.filter(selectedId => selectedId !== id)
        : [...canvasState.selectedElementIds, id];
    } else {
      newSelectedIds = [id];
    }
    
    setCanvasState(prev => ({
      ...prev,
      selectedElementIds: newSelectedIds,
    }));
  }, [canvasState.selectedElementIds]);

  const clearSelection = useCallback(() => {
    setCanvasState(prev => ({
      ...prev,
      selectedElementIds: [],
    }));
  }, []);

  // Tool management
  const setActiveTool = useCallback((tool: CanvasToolState['activeTool']) => {
    setToolState(prev => ({
      ...prev,
      activeTool: tool,
    }));
  }, []);

  // Canvas management
  const setZoom = useCallback((zoom: number) => {
    setCanvasState(prev => ({
      ...prev,
      zoom: Math.max(0.1, Math.min(5, zoom)),
    }));
  }, []);

  const setPan = useCallback((panX: number, panY: number) => {
    setCanvasState(prev => ({
      ...prev,
      panX,
      panY,
    }));
  }, []);

  const resetCanvas = useCallback(() => {
    const newState = initialCanvasState;
    setCanvasState(newState);
    setToolState(initialToolState);
    setHistory({
      past: [],
      present: newState,
      future: [],
    });
  }, []);

  // Export canvas state
  const exportCanvasState = useCallback(() => {
    return canvasState;
  }, [canvasState]);

  // Import canvas state
  const importCanvasState = useCallback((state: CanvasState) => {
    setCanvasState(state);
    pushToHistory(state);
  }, [pushToHistory]);

  return {
    // State
    canvasState,
    toolState,
    history,
    
    // Element methods
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    clearSelection,
    
    // Tool methods
    setActiveTool,
    
    // Canvas methods
    setZoom,
    setPan,
    resetCanvas,
    
    // History methods
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    
    // Export/Import
    exportCanvasState,
    importCanvasState,
  };
};

export default useCanvas;