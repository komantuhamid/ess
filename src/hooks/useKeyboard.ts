import { useState, useEffect } from 'react';

interface KeyState {
  accelerate: boolean;
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
}

export const useKeyboard = () => {
  const [keys, setKeys] = useState<KeyState>({
    accelerate: false,
    left: false,
    up: false,
    right: false,
    down: false
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKey(event, true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      handleKey(event, false);
    };

    const handleKey = (event: KeyboardEvent, status: boolean) => {
      switch (event.keyCode) {
        case 17:
        case 65:
          setKeys(prev => ({ ...prev, accelerate: status }));
          break;
        case 37:
          setKeys(prev => ({ ...prev, left: status }));
          break;
        case 39:
          setKeys(prev => ({ ...prev, right: status }));
          break;
        case 32:
          setKeys(prev => ({ ...prev, up: status }));
          break;
        case 40:
          setKeys(prev => ({ ...prev, down: status }));
          break;
        default:
          return;
      }
      event.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};
