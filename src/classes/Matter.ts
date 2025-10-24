private getTileImage(type: string): [number, number] {
  // These coordinates match the mario-objects.png sprite sheet
  const tileMap: Record<string, [number, number]> = {
    'grass_top': [0, 0],
    'grass_left': [0, 32],
    'grass_right': [64, 32],
    'soil': [32, 0],
    'brown_block': [96, 0],
    'stone': [0, 32],
    'coinbox': [384, 0],
    'multiple_coinbox': [384, 0],
    'mushroombox': [384, 0],
    'starbox': [384, 0],
    'pipe_top_left': [0, 128],
    'pipe_top_right': [32, 128],
    'pipe_left': [0, 160],
    'pipe_right': [32, 160],
    'pipe_left_grass': [0, 160],
    'pipe_right_grass': [32, 160],
    'pipe_left_soil': [0, 160],
    'pipe_right_soil': [32, 160],
    'bush_left': [176, 144],
    'bush_middle': [192, 144],
    'bush_right': [208, 144],
  };
  return tileMap[type] || [0, 0];
}
