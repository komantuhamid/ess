import { Hero } from './Hero';
import { Matter, Ground, Pipe, Coin } from './Matter';
import { LevelData, KeyState } from '@/types/game';
import { GAME_CONSTANTS, TILE_SIZE, GroundBlocking } from '@/types/constants';

export class Level {
  private container: HTMLDivElement;
  private hero?: Hero;
  private matter: Matter[] = [];
  private width: number = 0;
  private height: number = 0;
  private gameLoop?: number;
  private isPaused: boolean = false;
  private scrollX: number = 0;

  constructor(container: HTMLDivElement) {
    this.container = container;
  }

  load(data: LevelData): void {
    this.width = data.width;
    this.height = data.height;
    this.container.innerHTML = '';
    this.matter = [];

    this.parseLevelData(data.data);

    this.hero = new Hero(100, 100);
    const heroView = this.hero.createView();
    this.container.appendChild(heroView);
  }

  private parseLevelData(data: string[][]): void {
    for (let y = 0; y < data[0].length; y++) {
      for (let x = 0; x < data.length; x++) {
        const tile = data[x][y];
        if (tile && tile !== '') {
          this.createTile(tile, x * TILE_SIZE, y * TILE_SIZE);
        }
      }
    }
  }

  private createTile(type: string, x: number, y: number): void {
    let matterObj: Matter | null = null;

    switch (type) {
      case 'grass_top':
      case 'soil':
      case 'brown_block':
        matterObj = new Ground(x, y, [0, 0]);
        break;
      case 'pipe_top_left':
      case 'pipe_left':
        matterObj = new Pipe(x, y, [0, 64], GroundBlocking.All);
        break;
      case 'coin':
        matterObj = new Coin(x, y);
        break;
      case 'mario':
        if (this.hero) {
          this.hero.setPosition(x, y);
        }
        break;
    }

    if (matterObj) {
      const view = matterObj.createView();
      this.container.appendChild(view);
      this.matter.push(matterObj);
    }
  }

  start(): void {
    if (!this.gameLoop) {
      this.isPaused = false;
      this.gameLoop = window.setInterval(() => this.update(), GAME_CONSTANTS.interval);
    }
  }

  pause(): void {
    this.isPaused = true;
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = undefined;
    }
  }

  updateKeys(keys: KeyState): void {
    if (this.hero && !this.isPaused) {
      this.hero.handleInput(keys);
    }
  }

  private update(): void {
    if (this.isPaused || !this.hero) return;

    this.hero.update();
    this.hero.onGround = false;

    for (const matter of this.matter) {
      const collision = this.hero.checkCollision(matter);
      if (collision) {
        this.hero.resolveCollision(matter, collision);
      }
      matter.playFrame();
    }

    this.updateCamera();
  }

  private updateCamera(): void {
    if (!this.hero) return;
    const heroX = this.hero.x;
    const centerX = 256;

    if (heroX > centerX) {
      this.scrollX = Math.min(heroX - centerX, this.width * TILE_SIZE - 512);
      this.container.style.transform = `translateX(-${this.scrollX}px)`;
    }
  }

  getHero(): Hero | undefined {
    return this.hero;
  }
}
