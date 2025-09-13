import { fabric } from 'fabric';

export interface FabricCanvas extends fabric.Canvas {
  getZoom(): number;
  setZoom(value: number): fabric.Canvas;
  zoomToPoint(point: fabric.Point, value: number): fabric.Canvas;
  relativePan(point: fabric.Point): fabric.Canvas;
}

export interface FabricObject extends fabric.Object {
  id?: string;
  elementType?: string;
}

export interface FabricTextbox extends fabric.Textbox {
  id?: string;
  elementType?: string;
}

export interface FabricImage extends fabric.Image {
  id?: string;
  elementType?: string;
}

export interface FabricRect extends fabric.Rect {
  id?: string;
  elementType?: string;
}

export interface FabricCircle extends fabric.Circle {
  id?: string;
  elementType?: string;
}

export interface FabricLine extends fabric.Line {
  id?: string;
  elementType?: string;
}