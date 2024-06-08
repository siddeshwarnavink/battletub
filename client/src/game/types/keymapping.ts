export interface IKeyMapping {
  [key: number]: {
    /**
     * Player X-axis
     */
    x: number
    /**
     * Player Y-axis
     */
    y: number
    /**
     * Keybinding active
     */
    a: boolean
    /**
     * Player animation frame in sprite
     */
    f: number[]
  }
}
