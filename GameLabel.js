/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class GameLabel extends Sprite {
  constructor(x, y, text, font = '16px Helvetica', color = 'red', align = 'left') {
    super(x, y, 100, 100, color);
    this.text = text;
    this.font = font;
    this.align = align;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

export default GameLabel;
