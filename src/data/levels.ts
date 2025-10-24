import { LevelData } from '@/types/game';

export const definedLevels: LevelData[] = [
  {
    width: 100,
    height: 15,
    id: 0,
    background: 1,
    data: createSimpleLevel()
  }
];

function createSimpleLevel(): string[][] {
  const level: string[][] = [];
  
  // Create 100 columns
  for (let x = 0; x < 100; x++) {
    const column: string[] = [];
    
    // Create 15 rows per column
    for (let y = 0; y < 15; y++) {
      if (y < 13) {
        // Sky - empty
        column.push('');
      } else if (y === 13) {
        // Ground top
        column.push('grass_top');
      } else {
        // Underground
        column.push('soil');
      }
    }
    
    level.push(column);
  }
  
  // Add Mario at start
  level[5][12] = 'mario';
  
  // Add pipes
  level[10][11] = 'pipe_top_left';
  level[11][11] = 'pipe_top_right';
  level[10][12] = 'pipe_left';
  level[11][12] = 'pipe_right';
  
  level[30][11] = 'pipe_top_left';
  level[31][11] = 'pipe_top_right';
  level[30][12] = 'pipe_left';
  level[31][12] = 'pipe_right';
  
  // Add coin boxes
  level[15][9] = 'coinbox';
  level[20][9] = 'coinbox';
  level[21][9] = 'coinbox';
  level[25][9] = 'multiple_coinbox';
  
  // Add blocks
  level[35][10] = 'brown_block';
  level[36][10] = 'brown_block';
  level[37][10] = 'brown_block';
  
  // Add enemies
  level[40][12] = 'greenturtle';
  level[55][12] = 'ballmonster';
  
  // Add bushes
  level[18][13] = 'bush_left';
  level[19][13] = 'bush_middle';
  level[20][13] = 'bush_right';
  
  return level;
}
