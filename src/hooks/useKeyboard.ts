import { useState, useEffect } from 'react';
import { KeyState } from '@/types/game';

export const useKeyboard = (): KeyState => {
  const [keys, setKeys] = useState<KeyState>({
    accelerate: false,
    left: false,
    up: false,
    right: false,
    down: false
  });

  useEffect(() => {
    const handleKey = (event: KeyboardEvent, status: boolean): boolean => {
      const { keyCode } = event;
      
      switch (keyCode) {
        case 17:
        case 65:
          setKeys(prev => ({ ...prev, accelerate: status }));
          break;
        case 40:
          setKeys(prev => ({ ...prev, down: status }));
          break;
        case 39:
          setKeys(prev => ({ ...prev, right: status }));
          break;
        case 37:
          setKeys(prev => ({ ...prev, left: status }));
          break;
        case 32:
          setKeys(prev => ({ ...prev, up: status }));
          break;
        default:
          return true;
      }
      
      event.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => handleKey(e, true);
    const handleKeyUp = (e: KeyboardEvent) => handleKey(e, false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};
