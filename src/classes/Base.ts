import { Position, Size, ImageData } from '@/types/game';
import { GAME_CONSTANTS } from '@/types/constants';

export class Base {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  image?: ImageData;
  frameCount: number = 0;
  frameID?: string;
  frames: number = 0;
  currentFrame: number = 0;
  frameTick: number = 0;
  rewindFrames: boolean = false;
  view?: HTMLDivElement;

  constructor(x: number = 0, y: number = 0) {
    this.setPosition(x, y);
    this.clearFrames();
    this.frameCount = 0;
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  setImage(img: string, x: number, y: number): void {
    this.image = { path: img, x, y };
  }

  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  getSize(): Size {
    return { width: this.width, height: this.height };
  }

  setupFrames(fps: number, frames: number, rewind: boolean = false, id?: string): boolean {
    if (id) {
      if (this.frameID === id) return true;
      this.frameID = id;
    }
    
    this.currentFrame = 0;
    this.frameTick = frames ? (1000 / fps / GAME_CONSTANTS.interval) : 0;
    this.frames = frames;
    this.rewindFrames = rewind;
    return false;
  }

  clearFrames(): void {
    this.frameID = undefined;
    this.frames = 0;
    this.currentFrame = 0;
    this.frameTick = 0;
  }

  playFrame(): void {
    if (this.frameTick && this.view && this.image) {
      this.frameCount++;
      
      if (this.frameCount >= this.frameTick) {
        this.frameCount = 0;
        
        if (this.currentFrame === this.frames) {
          this.currentFrame = 0;
        }
        
        const frameOffset = this.rewindFrames 
          ? (this.frames - 1 - this.currentFrame) 
          : this.currentFrame;
        
        const bgX = this.image.x + this.width * frameOffset;
        this.view.style.backgroundPosition = `-${bgX}px -${this.image.y}px`;
        this.currentFrame++;
      }
    }
  }

  setMainImage(imageSource: string): void {
    if (this.view && this.image) {
      this.view.style.backgroundImage = `url(${imageSource})`;
      this.view.style.backgroundPosition = `-${this.image.x}px -${this.image.y}px`;
    }
  }

  createView(cssClass: string): HTMLDivElement {
    this.view = document.createElement('div');
    this.view.className = cssClass;
    this.view.style.position = 'absolute';
    this.view.style.width = `${this.width}px`;
    this.view.style.height = `${this.height}px`;
    
    if (this.image) {
      this.setMainImage(this.image.path);
    }
    
    return this.view;
  }

  updateView(): void {
    if (this.view) {
      this.view.style.left = `${this.x}px`;
      this.view.style.top = `${this.y}px`;
    }
  }

  removeView(): void {
    if (this.view && this.view.parentNode) {
      this.view.parentNode.removeChild(this.view);
    }
  }
}
