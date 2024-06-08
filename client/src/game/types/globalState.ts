import { Map } from '../core/Map'
import { Player } from '../core/Player'
import { Viewport } from '../core/Viewport'
import { IConfig } from './config'
import { IKeyMapping } from './keymapping'

export namespace GloablState {
  export let context: CanvasRenderingContext2D
  export let config: IConfig
  export let viewport: Viewport
  export let player: Player
  export let keys: IKeyMapping
  export let map: Map
  export let Loop: () => void
}
