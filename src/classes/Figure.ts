import { Base } from './Base';
import { Directions, CollisionType, CLS_FIGURE, GAME_CONSTANTS } from '@/types/constants';
import { Matter } from './Matter';

export class Figure extends Base {
  vx: number = 0;
  vy: number = 0;
  direction: Directions = Directions.None;
  state: number = 0;
  onGround: boolean = false;

  constructor(x: number, y: number) {
    super(x, y);
  }

  createView(): HTMLDivElement {
    return super.createView(CLS_FIGURE);
  }

  setVelocity(vx: number, vy: number): void {
    this.vx = vx;
    this.vy = vy;
  }

  getVelocity(): { vx: number; vy: number } {
    return { vx: this.vx, vy: this.vy };
  }

  applyGravity(): void {
    if (!this.onGround) {
      this.vy += GAME_CONSTANTS.gravity;
    }
  }

  updatePosition(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.updateView();
  }

  checkCollision(matter: Matter): CollisionType {
    const left = this.x;
    const right = this.x + this.width;
    const top = this.y;
    const bottom = this.y + this.height;

    const mLeft = matter.x;
    const mRight = matter.x + matter.width;
    const mTop = matter.y;
    const mBottom = matter.y + matter.height;

    if (right < mLeft || left > mRight || bottom < mTop || top > mBottom) {
      return CollisionType.None;
    }

    const overlapX = Math.min(right - mLeft, mRight - left);
    const overlapY = Math.min(bottom - mTop, mBottom - top);

    if (overlapX < overlapY) {
      return CollisionType.Horizontal;
    } else {
      return CollisionType.Vertical;
    }
  }

  resolveCollision(matter: Matter, type: CollisionType): void {
    if (type === CollisionType.Horizontal) {
      if (this.vx > 0 && matter.isBlockingLeftSide()) {
        this.x = matter.x - this.width;
        this.vx = 0;
      } else if (this.vx < 0 && matter.isBlockingRightSide()) {
        this.x = matter.x + matter.width;
        this.vx = 0;
      }
    } else if (type === CollisionType.Vertical) {
      if (this.vy > 0 && matter.isBlockingTopSide()) {
        this.y = matter.y - this.height;
        this.vy = 0;
        this.onGround = true;
      } else if (this.vy < 0 && matter.isBlockingBottomSide()) {
        this.y = matter.y + matter.height;
        this.vy = 0;
      }
    }
  }
}
