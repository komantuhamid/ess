export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ImageData {
  path: string;
  x: number;
  y: number;
}

export interface LevelData {
  width: number;
  height: number;
  id: number;
  background: number;
  data: string[][];
}

export interface KeyState {
  accelerate: boolean;
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
}

export interface GameState {
  coins: number;
  lives: number;
  score: number;
  time: number;
}
