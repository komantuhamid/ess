// src/classes/Base.ts
export class Base {
  x: number;
  y: number;
  width: number;
  height: number;
  frameCount: number;
  image?: {
    path: string;
    x: number;
    y: number;
  };

  constructor(x: number = 0, y: number = 0) {
    this.setPosition(x, y);
    this.clearFrames();
    this.frameCount = 0;
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
  
  // ... baki dial methods
}
