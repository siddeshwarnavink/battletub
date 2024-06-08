import { GloablState } from '../types/globalState'

export class Viewport {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) {}

  /**
   * center
   */
  public center() {
    let move_x = 0
    let move_y = 0

    const center_x = GloablState.player.pos.x + GloablState.config.size.char / 2
    const center_y = GloablState.player.pos.y + GloablState.config.size.char / 2

    for (const key in GloablState.keys) {
      if (GloablState.keys[key].a) {
        if (GloablState.keys[key].x != 0) {
          move_x = GloablState.keys[key].x
        }

        if (GloablState.keys[key].y != 0) {
          move_y = GloablState.keys[key].y
        }
      }
    }

    GloablState.player.move(move_x, move_y)
    GloablState.viewport.scroll(center_x, center_y)
  }

  /**
   * scroll
   */
  public scroll(x: number, y: number) {
    this.x = x - this.width / 2
    this.y = y - this.height / 2
  }
}
