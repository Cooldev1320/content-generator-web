'use client';

import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui';

interface CanvasProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  onCanvasReady?: (canvas: any) => void;
}

export default function Canvas({ 
  width = 800, 
  height = 600, 
  backgroundColor = '#ffffff',
  onCanvasReady 
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Initialize Fabric.js canvas here
    // const canvas = new fabric.Canvas(canvasRef.current, {
    //   width,
    //   height,
    //   backgroundColor
    // });
    
    // if (onCanvasReady) {
    //   onCanvasReady(canvas);
    // }
    
    setIsLoading(false);
  }, [width, height, backgroundColor, onCanvasReady]);

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading canvas...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <div className="h-full flex items-center justify-center bg-gray-100">
        <Card className="p-8 max-w-2xl w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Canvas Editor</h2>
            <p className="text-gray-600 mb-6">
              This is where the canvas editor will be implemented. 
              The actual canvas functionality will be added with Fabric.js integration.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Drag and drop elements</p>
              <p>• Text editing and styling</p>
              <p>• Image uploads and manipulation</p>
              <p>• Layer management</p>
              <p>• Export in multiple formats</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
