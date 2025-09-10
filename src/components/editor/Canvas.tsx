'use client';

import React, { useRef, useEffect, useState } from 'react';

interface CanvasProps {
  width?: number;
  height?: number;
  selectedTool?: string;
  onElementSelect?: (element: any) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  width = 800,
  height = 600,
  selectedTool = 'select',
  onElementSelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw elements
    elements.forEach((element) => {
      switch (element.type) {
        case 'rectangle':
          ctx.fillStyle = element.fill || '#000000';
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.radius, 0, 2 * Math.PI);
          ctx.fillStyle = element.fill || '#000000';
          ctx.fill();
          break;
        case 'text':
          ctx.font = `${element.fontSize || 16}px ${element.fontFamily || 'Arial'}`;
          ctx.fillStyle = element.fill || '#000000';
          ctx.fillText(element.text, element.x, element.y);
          break;
      }
    });
  }, [elements, width, height]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);

    if (selectedTool === 'rectangle') {
      const newElement = {
        id: Date.now(),
        type: 'rectangle',
        x,
        y,
        width: 0,
        height: 0,
        fill: '#3b82f6',
      };
      setElements(prev => [...prev, newElement]);
    } else if (selectedTool === 'circle') {
      const newElement = {
        id: Date.now(),
        type: 'circle',
        x,
        y,
        radius: 0,
        fill: '#ef4444',
      };
      setElements(prev => [...prev, newElement]);
    } else if (selectedTool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        const newElement = {
          id: Date.now(),
          type: 'text',
          x,
          y,
          text,
          fontSize: 16,
          fontFamily: 'Arial',
          fill: '#000000',
        };
        setElements(prev => [...prev, newElement]);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements(prev => {
      const lastElement = prev[prev.length - 1];
      if (!lastElement) return prev;

      const updated = [...prev];
      if (lastElement.type === 'rectangle') {
        updated[updated.length - 1] = {
          ...lastElement,
          width: x - lastElement.x,
          height: y - lastElement.y,
        };
      } else if (lastElement.type === 'circle') {
        const radius = Math.sqrt(
          Math.pow(x - lastElement.x, 2) + Math.pow(y - lastElement.y, 2)
        );
        updated[updated.length - 1] = {
          ...lastElement,
          radius,
        };
      }
      return updated;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleElementClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== 'select') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked element
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      let isInside = false;

      if (element.type === 'rectangle') {
        isInside = x >= element.x && x <= element.x + element.width &&
                   y >= element.y && y <= element.y + element.height;
      } else if (element.type === 'circle') {
        const distance = Math.sqrt(
          Math.pow(x - element.x, 2) + Math.pow(y - element.y, 2)
        );
        isInside = distance <= element.radius;
      }

      if (isInside) {
        onElementSelect?.(element);
        break;
      }
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleElementClick}
      />
    </div>
  );
};

export default Canvas;