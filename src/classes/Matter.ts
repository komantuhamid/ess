import { Base } from './Base';
import { GroundBlocking, CLS_MATTER, IMAGES } from '@/types/constants';

export class Matter extends Base {
  blocking: GroundBlocking;

  constructor(x: number, y: number, blocking: GroundBlocking = GroundBlocking.All) {
    super(x, y);
    this.blocking = blocking;
  }

  createView(): HTMLDivElement {
    return super.createView(CLS_MATTER);
  }

  setBlocking(blocking: GroundBlocking): void {
    this.blocking = blocking;
  }

  getBlocking(): GroundBlocking {
    return this.blocking;
  }

  isBlockingLeftSide(): boolean {
    return (this.blocking & GroundBlocking.Left) === GroundBlocking.Left;
  }

  isBlockingRightSide(): boolean {
    return (this.blocking & GroundBlocking.Right) === GroundBlocking.Right;
  }

  isBlockingTopSide(): boolean {
    return (this.blocking & GroundBlocking.Top) === GroundBlocking.Top;
  }

  isBlockingBottomSide(): boolean {
    return (this.blocking & GroundBlocking.Bottom) === GroundBlocking.Bottom;
  }
}

// Ground class - solid blocks
export class Ground extends Matter {
  constructor(x: number, y: number, img: [number, number]) {
    super(x, y, GroundBlocking.All);
    this.setImage(IMAGES.objects, img[0], img[1]);
    this.setSize(32, 32);
  }
}

// Pipe class - green pipes
export class Pipe extends Matter {
  constructor(x: number, y: number, img: [number, number], blocking: GroundBlocking) {
    super(x, y, blocking);
    this.setImage(IMAGES.objects, img[0], img[1]);
    this.setSize(32, 32);
  }
}

// Coin class - collectible coins
export class Coin extends Matter {
  constructor(x: number, y: number) {
    super(x, y, GroundBlocking.None);
    this.setImage(IMAGES.objects, 384, 0);
    this.setSize(32, 32);
    this.setupFrames(12, 4, false, 'coin');
  }

  collect(): void {
    this.removeView();
  }
}
