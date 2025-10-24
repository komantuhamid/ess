'use client';

import { GameCanvas } from '@/components/GameCanvas';
import { definedLevels } from '@/data/levels';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="game-container">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Super Mario TypeScript
        </h1>
        <GameCanvas levelData={definedLevels[0]} />
        <div className="text-white text-center mt-4">
          <p className="text-sm">Arrow Keys = Move | Space = Jump</p>
          <p className="text-xs mt-2">A or CTRL = Run</p>
        </div>
      </div>
    </main>
  );
}
