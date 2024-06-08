/**
 * Player movement data
 */
export interface IMovement {
  /**
   * Is player moving
   */
  moving: boolean
  /**
   * Active keybinding responsible for movement
   */
  key: number
  frame: number
}
