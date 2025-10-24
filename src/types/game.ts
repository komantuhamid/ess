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

export const GAME_CONSTANTS = {
  interval: 20,
  bounce: 15,
  gravity: 2,
  jumping_v: 27,
  walking_v: 5,
  // ... baki dial constants
}
