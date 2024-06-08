import { IDimension2D } from '../types/dimension2D'
import { GloablState } from '../types/globalState'
import { IPosition } from '../types/position'

/**
 * The camera that follows the player around
 */
export class Viewport {
  private position: IPosition = { x: 0, y: 0 }
  private dimenstion: IDimension2D = {
    width: GloablState.config.browserDimension.width,
    height: GloablState.config.browserDimension.height,
  }

  /**
   * Current viewport position
   */
  public getPosition(): IPosition {
    return this.position
  }

  /**
   * Current viewport dimension
   */
  public getDimension(): IDimension2D {
    return this.dimenstion
  }

  /**
   * Reset position and dimension of viewport to initial values
   */
  public reset(): void {
    this.position = { x: 0, y: 0 }
    this.dimenstion = {
      width: GloablState.config.browserDimension.width,
      height: GloablState.config.browserDimension.height,
    }
  }

  /**
   * Correctly position the viewport at center
   */
  public center(): void {
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
   * Move the viewport
   */
  private scroll(x: number, y: number): void {
    this.position.x = x - this.dimenstion.width / 2
    this.position.y = y - this.dimenstion.height / 2
  }
}
