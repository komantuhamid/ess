import { Hero } from './Hero';
import { Matter, Ground, Pipe, Coin } from './Matter';
import { LevelData, KeyState } from '@/types/game';
import { GAME_CONSTANTS, TILE_SIZE, GroundBlocking } from '@/types/constants';

const BACKGROUNDS: Record<number, string> = {
  1: '/Content/backgrounds/01.jpg',
  2: '/Content/backgrounds/02.jpg',
  3: '/Content/backgrounds/03.jpg',
  4: '/Content/backgrounds/04.jpg',
  5: '/Content/backgrounds/05.jpg',
  6: '/Content/backgrounds/06.jpg',
  7: '/Content/backgrounds/07.jpg',
  8: '/Content/backgrounds/08.jpg'
};

export class Level {
  private container: HTMLDivElement;
  private hero?: Hero;
  private matter: Matter[] = [];
  private obstacles: (Matter | null)[][] = [];  // 2D GRID!
  private width: number = 0;
  private height: number = 0;
  private gameLoop?: number;
  private isPaused: boolean = false;
  private scrollX: number = 0;
  private backgroundId: number = 1;

  constructor(container: HTMLDivElement) {
    this.container = container;
  }

  load(data: LevelData): void {
    this.width = data.width;
    this.height = data.height;
    this.backgroundId = data.background;

    this.container.innerHTML = '';
    this.matter = [];
    
    // Initialize 2D grid
    this.obstacles = [];
    for (let i = 0; i < this.width; i++) {
      const column: (Matter | null)[] = [];
      for (let j = 0; j < this.height; j++) {
        column.push(null);
      }
      this.obstacles.push(column);
    }

    this.setBackground(this.backgroundId);
    this.parseLevelData(data.data);

    this.hero = new Hero(100, 100);
    const heroView = this.hero.createView();
    this.container.appendChild(heroView);
  }

  private parseLevelData(data: string[][]): void {
    const height = data[0].length;
    
    // IMPORTANT: Y-axis is INVERTED (bottom-up)
    for (let i = 0; i < data.length; i++) {
      const col = data[i];
      for (let j = 0; j < height; j++) {
        const tile = col[j];
        if (tile && tile !== '') {
          // Calculate Y position: BOTTOM-UP coordinate system
          const x = i * TILE_SIZE;
          const y = (height - j - 1) * TILE_SIZE;
          this.createTile(tile, x, y, i, height - j - 1);
        }
      }
    }
  }

  private createTile(type: string, x: number, y: number, gridX: number, gridY: number): void {
    let matterObj: Matter | null = null;

    switch (type) {
      case 'grass_top':
        matterObj = new Ground(x, y, [888, 404]);
        break;
      case 'soil':
        matterObj = new Ground(x, y, [888, 438]);
        break;
      case 'brown_block':
        matterObj = new Ground(x, y, [514, 194]);
        break;
      case 'pipe_top_left':
        matterObj = new Pipe(x, y, [2, 358], GroundBlocking.All);
        break;
      case 'pipe_top_right':
        matterObj = new Pipe(x, y, [36, 358], GroundBlocking.All);
        break;
      case 'pipe_left':
        matterObj = new Pipe(x, y, [2, 390], GroundBlocking.Left | GroundBlocking.Bottom);
        break;
      case 'pipe_right':
        matterObj = new Pipe(x, y, [36, 390], GroundBlocking.Right | GroundBlocking.Bottom);
        break;
      case 'coin':
      case 'coinbox':
        matterObj = new Coin(x, y);
        break;
      case 'mario':
        if (this.hero) {
          this.hero.setPosition(x, y);
        }
        return;
      // Add more tile types...
    }

    if (matterObj) {
      const view = matterObj.createView();
      this.container.appendChild(view);
      this.matter.push(matterObj);
      
      // Register in grid
      this.obstacles[gridX][gridY] = matterObj;
    }
  }

  private setBackground(backgroundId: number): void {
    const bgUrl = BACKGROUNDS[backgroundId] || BACKGROUNDS[1];
    this.container.parentElement!.style.backgroundImage = `url(${bgUrl})`;
    this.container.parentElement!.style.backgroundPosition = '0 -380px';  // FIXED!
    this.container.parentElement!.style.backgroundRepeat = 'repeat-x';
  }

  // ... rest of methods stay the same
}
