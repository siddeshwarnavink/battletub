import { Profile } from '../types/profile'
import config from './config'
import keymapping from './config/keymapping'
import { Map } from './core/Map'
import { Player } from './core/Player'
import { Viewport } from './core/Viewport'
import { GloablState } from './types/globalState'
import { IMapdata } from './types/mapData'
import { IPosition } from './types/position'

const loop = () => {
  window.requestAnimationFrame(loop)

  checkSizing()

  const { viewport, map, player } = GloablState

  viewport.center()
  map.draw()
  player.draw()
}

export const initilize = (user: Profile, canvasEl: HTMLCanvasElement, mapData: IMapdata) => {
  const context = canvasEl.getContext('2d')

  if (context === null) throw new Error('Invalid canvas element')

  GloablState.context = context
  GloablState.config = config
  GloablState.keys = keymapping
  GloablState.map = new Map(mapData)
  GloablState.viewport = new Viewport()
  GloablState.player = new Player(user.id, 4, 4)
  GloablState.Loop = loop

  checkSizing()
  window.onresize = () => checkSizing()
  loop()
}

const checkSizing = () => {
  const { config, viewport, context } = GloablState

  config.browserDimension = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  config.tiles = {
    x: Math.ceil(config.browserDimension.width / config.size.tile),
    y: Math.ceil(config.browserDimension.height / config.size.tile),
  }

  config.center = {
    x: Math.round(config.tiles.x / 2),
    y: Math.round(config.tiles.y / 2),
  }

  viewport.reset()

  context.canvas.width = config.browserDimension.width
  context.canvas.height = config.browserDimension.height
}

// player movement start:
document.addEventListener('keydown', (event) => {
  const { player, keys } = GloablState
  if (event.keyCode >= 37 && event.keyCode <= 40) {
    player.movement.moving = true
    player.movement.key = event.keyCode
    player.dispatchMovement()

    for (const key in keys) {
      if (parseInt(key) === event.keyCode) {
        keys[key].a = true
      }
    }
  } else {
    switch (event.keyCode) {
      case 84: // t
        player.torch.lit = player.torch.lit ? false : true
        break
    }
  }
})

// player movement end:
document.addEventListener('keyup', (event) => {
  const { player, keys } = GloablState
  let found = false

  for (const key in keys) {
    if (key === event.keyCode.toString()) {
      keys[key].a = false
    }
  }

  for (const key in keys) {
    if (keys[key].a) {
      player.movement.key = parseInt(key)
      found = true
    }
  }

  if (!found) {
    player.movement.moving = false
  }
})
