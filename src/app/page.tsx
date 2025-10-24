'use client';

import { GameCanvas } from '@/components/GameCanvas';
import { definedLevels } from '@/data/levels';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <GameCanvas levelData={definedLevels[0]} />
    </main>
  );
}
