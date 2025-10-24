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
  private obstacles: (Matter | null)[][] = [];
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
    console.log('Loading level:', data.width, 'x', data.height);
    
    this.width = data.width;
    this.height = data.height;
    this.backgroundId = data.background;

    this.container.innerHTML = '';
    this.matter = [];
    
    // Initialize 2D obstacles grid
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

    console.log('Created', this.matter.length, 'matter objects');

    this.hero = new Hero(100, 100);
    const heroView = this.hero.createView();
    this.container.appendChild(heroView);
  }

  private parseLevelData(data: string[][]): void {
    const height = data[0] ? data[0].length : 0;
    
    // CRITICAL: Y-axis is INVERTED (bottom-up coordinate system)
    for (let i = 0; i < data.length; i++) {
      const col = data[i];
      for (let j = 0; j < height; j++) {
        const tile = col[j];
        if (tile && tile !== '') {
          // Y position calculated from BOTTOM
          const x = i * TILE_SIZE;
          const y = (height - j - 1) * TILE_SIZE;
          const gridX = i;
          const gridY = height - j - 1;
          this.createTile(tile, x, y, gridX, gridY);
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
      case 'grass_left':
        matterObj = new Ground(x, y, [888, 438]);
        break;
      case 'grass_right':
        matterObj = new Ground(x, y, [888, 438]);
        break;
      case 'soil':
        matterObj = new Ground(x, y, [888, 438]);
        break;
      case 'brown_block':
        matterObj = new Ground(x, y, [514, 194]);
        break;
      case 'stone':
        matterObj = new Ground(x, y, [550, 160]);
        break;
      case 'pipe_top_left':
        matterObj = new Pipe(x, y, [2, 358], GroundBlocking.All);
        break;
      case 'pipe_top_right':
        matterObj = new Pipe(x, y, [36, 358], GroundBlocking.All);
        break;
      case 'pipe_left':
      case 'pipe_left_grass':
      case 'pipe_left_soil':
        matterObj = new Pipe(x, y, [2, 390], GroundBlocking.Left | GroundBlocking.Bottom);
        break;
      case 'pipe_right':
      case 'pipe_right_grass':
      case 'pipe_right_soil':
        matterObj = new Pipe(x, y, [36, 390], GroundBlocking.Right | GroundBlocking.Bottom);
        break;
      case 'coin':
      case 'coinbox':
        matterObj = new Coin(x, y);
        break;
      case 'multiple_coinbox':
      case 'mushroombox':
      case 'starbox':
        matterObj = new Ground(x, y, [384, 0]);
        break;
      case 'bush_left':
        matterObj = new Ground(x, y, [176, 144]);
        break;
      case 'bush_middle':
        matterObj = new Ground(x, y, [192, 144]);
        break;
      case 'bush_right':
        matterObj = new Ground(x, y, [208, 144]);
        break;
      case 'mario':
        if (this.hero) {
          this.hero.setPosition(x, y - 10);
        }
        return;
      case 'greenturtle':
      case 'ballmonster':
      case 'staticplant':
        // TODO: Implement enemies
        break;
    }

    if (matterObj) {
      const view = matterObj.createView();
      this.container.appendChild(view);
      this.matter.push(matterObj);
      
      // Register in collision grid
      if (gridX >= 0 && gridX < this.width && gridY >= 0 && gridY < this.height) {
        this.obstacles[gridX][gridY] = matterObj;
      }
    }
  }

  private setBackground(backgroundId: number): void {
    const bgUrl = BACKGROUNDS[backgroundId] || BACKGROUNDS[1];
    const parent = this.container.parentElement;
    if (parent) {
      parent.style.backgroundImage = `url(${bgUrl})`;
      parent.style.backgroundPosition = '0 -380px';
      parent.style.backgroundRepeat = 'repeat-x';
      parent.style.backgroundSize = 'auto 600px';
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

  resume(): void {
    if (this.isPaused) {
      this.start();
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
        
        if (matter instanceof Coin) {
          this.hero.collectCoin();
          matter.collect();
          const index = this.matter.indexOf(matter);
          if (index > -1) {
            this.matter.splice(index, 1);
          }
        }
      }
      
      matter.playFrame();
    }

    this.updateCamera();

    if (this.hero.y > this.height * TILE_SIZE) {
      this.respawnHero();
    }
  }

  private updateCamera(): void {
    if (!this.hero) return;

    const heroX = this.hero.x;
    const viewportCenter = 256;

    if (heroX > viewportCenter) {
      this.scrollX = Math.min(
        heroX - viewportCenter, 
        this.width * TILE_SIZE - 512
      );
      this.container.style.transform = `translateX(-${this.scrollX}px)`;
    } else {
      this.scrollX = 0;
      this.container.style.transform = 'translateX(0)';
    }
  }

  private respawnHero(): void {
    if (!this.hero) return;
    this.hero.setPosition(100, 100);
    this.hero.setVelocity(0, 0);
    this.scrollX = 0;
    this.container.style.transform = 'translateX(0)';
  }

  getHero(): Hero | undefined {
    return this.hero;
  }

  getScrollX(): number {
    return this.scrollX;
  }

  getGridHeight(): number {
    return this.height;
  }

  destroy(): void {
    this.pause();
    
    for (const matter of this.matter) {
      matter.removeView();
    }
    
    if (this.hero) {
      this.hero.removeView();
    }
    
    this.container.innerHTML = '';
    this.matter = [];
    this.obstacles = [];
    this.hero = undefined;
  }
}
