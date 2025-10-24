import { Figure } from './Figure';
import { Directions, MarioStates, SizeStates, GAME_CONSTANTS, IMAGES } from '@/types/constants';
import { KeyState } from '@/types/game';

export class Hero extends Figure {
  lives: number;
  coins: number;
  marioState: MarioStates;
  sizeState: SizeStates;
  invincible: number = 0;
  cooldown: number = 0;

  constructor(x: number, y: number) {
    super(x, y);
    this.lives = GAME_CONSTANTS.start_lives;
    this.coins = 0;
    this.marioState = MarioStates.Normal;
    this.sizeState = SizeStates.Small;
    this.setImage(IMAGES.sprites, 0, 0);
    this.setSize(32, 32);
  }

  handleInput(keys: KeyState): void {
    if (keys.left) {
      this.moveLeft(keys.accelerate);
    } else if (keys.right) {
      this.moveRight(keys.accelerate);
    } else {
      this.vx *= 0.8;
    }

    if (keys.up && this.onGround && this.cooldown === 0) {
      this.jump();
    }

    if (this.cooldown > 0) {
      this.cooldown--;
    }
  }

  moveLeft(accelerate: boolean): void {
    const speed = accelerate ? GAME_CONSTANTS.walking_v * 1.5 : GAME_CONSTANTS.walking_v;
    this.vx = Math.max(this.vx - 0.5, -speed);
    this.direction = Directions.Left;
    
    if (this.view) {
      this.view.style.transform = 'scaleX(-1)';
    }
    
    this.setupFrames(10, 3, false, 'walk');
  }

  moveRight(accelerate: boolean): void {
    const speed = accelerate ? GAME_CONSTANTS.walking_v * 1.5 : GAME_CONSTANTS.walking_v;
    this.vx = Math.min(this.vx + 0.5, speed);
    this.direction = Directions.Right;
    
    if (this.view) {
      this.view.style.transform = 'scaleX(1)';
    }
    
    this.setupFrames(10, 3, false, 'walk');
  }

  jump(): void {
    this.vy = -GAME_CONSTANTS.jumping_v;
    this.onGround = false;
    this.cooldown = GAME_CONSTANTS.cooldown;
  }

  collectCoin(): void {
    this.coins++;
  }

  update(): void {
    this.applyGravity();
    this.updatePosition();
    this.playFrame();

    if (this.invincible > 0) {
      this.invincible--;
      if (this.view) {
        this.view.style.opacity = this.invincible % 2 === 0 ? '0.5' : '1';
      }
    }
  }
}
