import { IDimension2D } from './dimension2D'
import { IPosition } from './position'

/**
 * The current configuration of the running game
 */
export interface IConfig {
  /**
   * Browser window dimension
   */
  browserDimension: IDimension2D
  /**
   * The number of 64x64 pixel tiles that can fit within the viewport, with an offset of 2 to ensure there is overflow and no blank space.
   */
  tiles: IPosition
  /**
   * The horizontal and vertical center of the Viewport
   */
  center: IPosition
  /**
   * Size of the map
   */
  size: {
    tile: number
    char: number
  }
  /**
   * Player moving speed
   */
  speed: number
}
