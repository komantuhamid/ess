import { Hero } from './Hero';
import { Matter, Ground, Pipe, Coin } from './Matter';
import { LevelData, KeyState } from '@/types/game';
import { GAME_CONSTANTS, TILE_SIZE, GroundBlocking } from '@/types/constants';

// Background images mapping
const BACKGROUNDS: Record<number, string> = {
  1: '/Content/backgrounds/01.jpg',  // Sky with clouds
  2: '/Content/backgrounds/02.jpg',  // Forest/bushes
  3: '/Content/backgrounds/03.jpg',  // Night sky with stars
  4: '/Content/backgrounds/04.jpg',  // Mountains green
  5: '/Content/backgrounds/05.jpg',  // Sky with white clouds
  6: '/Content/backgrounds/06.jpg',  // Desert/cactus
  7: '/Content/backgrounds/07.jpg',  // Mountains snow
  8: '/Content/backgrounds/08.jpg'   // Night stars green
};

export class Level {
  private container: HTMLDivElement;
  private hero?: Hero;
  private matter: Matter[] = [];
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

    // Clear existing content
    this.container.innerHTML = '';
    this.matter = [];

    // Set background image
    this.setBackground(this.backgroundId);

    // Create level elements from data
    this.parseLevelData(data.data);

    // Create hero (Mario)
    this.hero = new Hero(100, 100);
    const heroView = this.hero.createView();
    this.container.appendChild(heroView);
  }

  private setBackground(backgroundId: number): void {
    const bgUrl = BACKGROUNDS[backgroundId] || BACKGROUNDS[1];
    this.container.style.backgroundImage = `url(${bgUrl})`;
    this.container.style.backgroundSize = 'cover';
    this.container.style.backgroundRepeat = 'repeat-x';
    this.container.style.backgroundPosition = 'center top';
  }

  private parseLevelData(data: string[][]): void {
    // Iterate through the level data grid
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
      // Ground tiles
      case 'grass_top':
        matterObj = new Ground(x, y, [0, 0]);
        break;
      case 'grass_left':
        matterObj = new Ground(x, y, [0, 32]);
        break;
      case 'grass_right':
        matterObj = new Ground(x, y, [64, 32]);
        break;
      case 'soil':
      case 'soil_left':
      case 'soil_right':
        matterObj = new Ground(x, y, [32, 0]);
        break;
      case 'brown_block':
        matterObj = new Ground(x, y, [0, 64]);
        break;
      case 'stone':
        matterObj = new Ground(x, y, [32, 64]);
        break;
      
      // Pipe tiles
      case 'pipe_top_left':
        matterObj = new Pipe(x, y, [0, 96], GroundBlocking.All);
        break;
      case 'pipe_top_right':
        matterObj = new Pipe(x, y, [32, 96], GroundBlocking.All);
        break;
      case 'pipe_left':
      case 'pipe_left_grass':
      case 'pipe_left_soil':
        matterObj = new Pipe(x, y, [0, 128], GroundBlocking.All);
        break;
      case 'pipe_right':
      case 'pipe_right_grass':
      case 'pipe_right_soil':
        matterObj = new Pipe(x, y, [32, 128], GroundBlocking.All);
        break;
      
      // Collectibles
      case 'coin':
      case 'coinbox':
        matterObj = new Coin(x, y);
        break;
      
      // Question blocks
      case 'multiple_coinbox':
      case 'mushroom':
      case 'star':
        matterObj = new Ground(x, y, [96, 0]);
        break;
      
      // Mario starting position
      case 'mario':
        if (this.hero) {
          this.hero.setPosition(x, y);
        }
        return; // Don't create matter for Mario
      
      // Enemies (future implementation)
      case 'greenturtle':
      case 'ballmonster':
      case 'staticplant':
        // TODO: Create enemy instances
        break;
      
      // Platforms and blocks
      case 'stone_wall':
        matterObj = new Ground(x, y, [64, 64]);
        break;
      case 'bush_left':
      case 'bush_middle':
      case 'bush_right':
        matterObj = new Ground(x, y, [128, 0]);
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

    // Update hero physics
    this.hero.update();

    // Reset ground status before collision check
    this.hero.onGround = false;

    // Check collisions with all matter objects
    for (const matter of this.matter) {
      const collision = this.hero.checkCollision(matter);
      if (collision) {
        this.hero.resolveCollision(matter, collision);
        
        // Check if it's a coin
        if (matter instanceof Coin) {
          this.hero.collectCoin();
          matter.collect();
          // Remove coin from matter array
          const index = this.matter.indexOf(matter);
          if (index > -1) {
            this.matter.splice(index, 1);
          }
        }
      }
      
      // Play animations for matter (like coins)
      matter.playFrame();
    }

    // Update camera to follow Mario
    this.updateCamera();

    // Check if Mario fell off the level
    if (this.hero.y > this.height * TILE_SIZE) {
      this.respawnHero();
    }
  }

  private updateCamera(): void {
    if (!this.hero) return;

    const heroX = this.hero.x;
    const viewportCenter = 256; // Half of 512px viewport width

    // Start scrolling when Mario passes the center
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
    
    // Respawn at start position
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

  getMatter(): Matter[] {
    return this.matter;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  destroy(): void {
    this.pause();
    
    // Remove all matter views
    for (const matter of this.matter) {
      matter.removeView();
    }
    
    // Remove hero view
    if (this.hero) {
      this.hero.removeView();
    }
    
    // Clear container
    this.container.innerHTML = '';
    this.matter = [];
    this.hero = undefined;
  }
}
