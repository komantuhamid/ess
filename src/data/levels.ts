import { LevelData } from '@/types/game';

// Simple test level - 50 columns x 15 rows
export const definedLevels: LevelData[] = [
  {
    width: 50,
    height: 15,
    id: 0,
    background: 1,
    data: [
      // Column 0-4: Empty start
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      
      // Column 5: Mario spawn
      ['', '', '', '', '', '', '', '', '', '', '', '', 'mario', 'grass_top', 'soil'],
      
      // Column 6-9: Ground
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      
      // Column 10-11: First pipe
      ['', '', '', '', '', '', '', '', '', '', '', 'pipe_top_left', 'pipe_left', 'pipe_left_grass', 'pipe_left_soil'],
      ['', '', '', '', '', '', '', '', '', '', '', 'pipe_top_right', 'pipe_right', 'pipe_right_grass', 'pipe_right_soil'],
      
      // Column 12-14: Ground
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      
      // Column 15: Coin box
      ['', '', '', '', '', '', '', '', '', 'coinbox', '', '', '', 'grass_top', 'soil'],
      
      // Column 16-19: Ground
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      
      // Column 20-21: Second pipe (taller)
      ['', '', '', '', '', '', '', '', '', 'pipe_top_left', 'pipe_left', 'pipe_left', 'pipe_left_grass', 'pipe_left_soil', 'soil'],
      ['', '', '', '', '', '', '', '', '', 'pipe_top_right', 'pipe_right', 'pipe_right', 'pipe_right_grass', 'pipe_right_soil', 'soil'],
      
      // Column 22-24: Ground with bushes
      ['', '', '', '', '', '', '', '', '', '', '', '', 'bush_left', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', 'bush_middle', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', 'bush_right', 'grass_top', 'soil'],
      
      // Column 25-27: Floating blocks
      ['', '', '', '', '', '', '', '', '', 'brown_block', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', 'brown_block', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', 'brown_block', '', '', '', 'grass_top', 'soil'],
      
      // Column 28-29: Multiple coin boxes
      ['', '', '', '', '', '', '', '', '', 'multiple_coinbox', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', 'coinbox', '', '', '', 'grass_top', 'soil'],
      
      // Column 30-49: Continue ground to end
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil']
    ]
  }
];
