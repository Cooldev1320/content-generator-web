import { useEffect, useCallback } from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import { generateId } from '@/lib/utils';
import type { CanvasElement } from '@/types';

export function useCanvas() {
  const canvasStore = useCanvasStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'z':
            event.preventDefault();
            if (event.shiftKey) {
              canvasStore.redo();
            } else {
              canvasStore.undo();
            }
            break;
          case 'y':
            event.preventDefault();
            canvasStore.redo();
            break;
          case 'a':
            event.preventDefault();
            canvasStore.selectAll();
            break;
          case 'd':
            event.preventDefault();
            if (canvasStore.selectedElementIds.length === 1) {
              canvasStore.duplicateElement(canvasStore.selectedElementIds[0]);
            }
            break;
        }
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        canvasStore.selectedElementIds.forEach((id) => {
          canvasStore.removeElement(id);
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canvasStore]);

  // Helper functions
  const addTextElement = useCallback((text: string, x: number, y: number) => {
    canvasStore.addElement({
      type: 'text',
      text,
      left: x,
      top: y,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#000000',
      width: 200,
      height: 50,
    });
  }, [canvasStore]);

  const addRectangleElement = useCallback((x: number, y: number, width: number, height: number) => {
    canvasStore.addElement({
      type: 'rectangle',
      left: x,
      top: y,
      width,
      height,
      fill: '#3b82f6',
      stroke: '#1e40af',
      strokeWidth: 2,
    });
  }, [canvasStore]);

  const addCircleElement = useCallback((x: number, y: number, radius: number) => {
    canvasStore.addElement({
      type: 'circle',
      left: x - radius,
      top: y - radius,
      width: radius * 2,
      height: radius * 2,
      fill: '#ef4444',
      stroke: '#dc2626',
      strokeWidth: 2,
    });
  }, [canvasStore]);

  const addImageElement = useCallback((src: string, x: number, y: number, width: number, height: number) => {
    canvasStore.addElement({
      type: 'image',
      src,
      left: x,
      top: y,
      width,
      height,
    });
  }, [canvasStore]);

  const addLineElement = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    canvasStore.addElement({
      type: 'line',
      left: x1,
      top: y1,
      width: x2 - x1,
      height: y2 - y1,
      stroke: '#000000',
      strokeWidth: 2,
    });
  }, [canvasStore]);

  const centerCanvas = useCallback(() => {
    canvasStore.setZoom(1);
  }, [canvasStore]);

  const fitToScreen = useCallback(() => {
    // This would need to be implemented based on the actual canvas container size
    canvasStore.setZoom(0.8);
  }, [canvasStore]);

  const zoomIn = useCallback(() => {
    const newZoom = Math.min(canvasStore.zoom + 0.1, 5);
    canvasStore.setZoom(newZoom);
  }, [canvasStore.zoom, canvasStore]);

  const zoomOut = useCallback(() => {
    const newZoom = Math.max(canvasStore.zoom - 0.1, 0.1);
    canvasStore.setZoom(newZoom);
  }, [canvasStore.zoom, canvasStore]);

  return {
    ...canvasStore,
    // Helper functions
    addTextElement,
    addRectangleElement,
    addCircleElement,
    addImageElement,
    addLineElement,
    centerCanvas,
    fitToScreen,
    zoomIn,
    zoomOut,
  };
}
