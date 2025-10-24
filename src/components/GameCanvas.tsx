'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useKeyboard } from '@/hooks/useKeyboard';
import { Level } from '@/classes/Level';
import { LevelData, GameState } from '@/types/game';

interface GameCanvasProps {
  levelData: LevelData;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ levelData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<Level | null>(null);
  const keys = useKeyboard();
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    coins: 0,
    lives: 3,
    score: 0,
    time: 400
  });

  useEffect(() => {
    if (containerRef.current && !levelRef.current) {
      levelRef.current = new Level(containerRef.current);
      levelRef.current.load(levelData);
      levelRef.current.start();
      setIsLoaded(true);
    }

    return () => {
      if (levelRef.current) {
        levelRef.current.pause();
      }
    };
  }, [levelData]);

  useEffect(() => {
    if (levelRef.current && isLoaded) {
      levelRef.current.updateKeys(keys);
    }
  }, [keys, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      const hero = levelRef.current?.getHero();
      if (hero) {
        setGameState({
          coins: hero.coins,
          lives: hero.lives,
          score: hero.coins * 100,
          time: gameState.time - 1
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoaded, gameState.time]);

  return (
    <div className="game-wrapper">
      <div className="game-ui">
        <div className="ui-item">
          <span>COINS</span>
          <div>×{gameState.coins.toString().padStart(2, '0')}</div>
        </div>
        <div className="ui-item">
          <span>WORLD</span>
          <div>1-1</div>
        </div>
        <div className="ui-item">
          <span>TIME</span>
          <div>{gameState.time}</div>
        </div>
        <div className="ui-item">
          <span>LIVES</span>
          <div>×{gameState.lives}</div>
        </div>
      </div>
      
      <div className="game-viewport">
        <div ref={containerRef} id="game-world" className="game-world" />
      </div>
    </div>
  );
};
