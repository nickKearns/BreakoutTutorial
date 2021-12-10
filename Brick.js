/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x = 15, y = 30, width = 75, height = 20, color = 'fuchsia', status = 1) {
    super(x, y, width, height, color);
    this.status = status;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
