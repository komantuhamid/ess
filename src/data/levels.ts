import { LevelData } from '@/types/game';

export const definedLevels: LevelData[] = [
  {
    width: 252,
    height: 15,
    id: 0,
    background: 1,
    data: [
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', 'pipe_top_left', 'pipe_left', 'pipe_left_grass', 'pipe_left_soil'],
      ['', '', '', '', '', '', '', '', '', '', '', 'pipe_top_right', 'pipe_right', 'pipe_right_grass', 'pipe_right_soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', 'mario', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', 'multiple_coinbox', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'planted_soil_left'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'planted_soil_middle'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'planted_soil_right'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', 'bush_left', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', 'bush_middle', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', 'bush_middle_right', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', 'bush_right', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', 'mushroombox', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', 'ballmonster', 'grass_top', 'soil'],
      // Add more columns... copy from your testlevels.js
      // I'll show you a shortcut to convert it all
    ]
  }
];
