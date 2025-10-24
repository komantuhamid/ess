import { LevelData } from '@/types/game';

// Copy your testlevels.js data here and convert to TypeScript
export const definedLevels: LevelData[] = [
  {
    width: 252,
    height: 15,
    id: 0,
    background: 1,
    data: [
      // Paste your level arrays from testlevels.js here
      // Example structure:
      ['', '', '', 'grass_top', 'soil'],
      ['', '', '', 'grass_top', 'soil'],
      // ... more columns
    ]
  }
];
