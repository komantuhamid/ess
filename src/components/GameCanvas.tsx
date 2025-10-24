import React, { useRef, useEffect } from 'react';
import { useKeyboard } from '@/hooks/useKeyboard';
import { Level } from '@/classes/Level';

interface GameCanvasProps {
  levelData: any;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ levelData }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const keys = useKeyboard();
  const levelRef = useRef<Level | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      levelRef.current = new Level('game-world');
      levelRef.current.load(levelData);
      levelRef.current.start();
    }

    return () => {
      levelRef.current?.pause();
    };
  }, [levelData]);

  return (
    <div id="game-world" ref={canvasRef} className="game-container">
      {/* Game elements rendered here */}
    </div>
  );
};
