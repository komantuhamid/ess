export const AUDIOPATH = 'Content/audio/';
export const BASEPATH = 'Content/';
export const DIV = '<div></div>';
export const CLS_FIGURE = 'figure';
export const CLS_MATTER = 'matter';

export enum Directions {
  None = 0,
  Left = 1,
  Up = 2,
  Right = 3,
  Down = 4
}

export enum MarioStates {
  Normal = 0,
  Fire = 1
}

export enum SizeStates {
  Small = 1,
  Big = 2
}

export enum GroundBlocking {
  None = 0,
  Left = 1,
  Top = 2,
  Right = 4,
  Bottom = 8,
  All = 15
}

export enum CollisionType {
  None = 0,
  Horizontal = 1,
  Vertical = 2
}

export enum DeathModes {
  Normal = 0,
  Shell = 1
}

export const IMAGES = {
  enemies: BASEPATH + 'mario-enemies.png',
  sprites: BASEPATH + 'mario-sprites.png',
  objects: BASEPATH + 'mario-objects.png',
  peach: BASEPATH + 'mario-peach.png'
};

export const GAME_CONSTANTS = {
  interval: 20,
  bounce: 15,
  cooldown: 20,
  gravity: 2,
  start_lives: 3,
  max_width: 400,
  max_height: 15,
  jumping_v: 27,
  walking_v: 5,
  mushroom_v: 3,
  ballmonster_v: 2,
  spiked_turtle_v: 1.5,
  small_turtle_v: 0.8,
  big_turtle_v: 1.3,
  shell_v: 5,
  shell_wait: 1500
};

export const TILE_SIZE = 32;
export const VIEWPORT_WIDTH = 512;
export const VIEWPORT_HEIGHT = 480;
