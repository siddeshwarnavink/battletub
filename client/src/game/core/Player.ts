import { GloablState } from '../types/globalState'
import { IMovement } from '../types/movement'
import { IPosition } from '../types/position'
import { ITorch } from '../types/torch'

export class Player {
  private frames: number[] = [
    0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.48, 0.46, 0.44, 0.42, 0.4,
  ]
  private sprite: HTMLImageElement = new Image()
  public movement: IMovement = {
    moving: false,
    key: 40,
    frame: 1,
  }
  public pos: IPosition
  private tile: IPosition
  public torch: ITorch = {
    lit: false,
    frame: 0,
  }

  constructor(tile_x: number, tile_y: number) {
    setInterval(() => GloablState.player.frame(), 125)
    this.sprite.src = '/game-assets/img/char/hero.png'

    this.pos = {
      x: GloablState.config.size.tile * tile_x,
      y: GloablState.config.size.tile * tile_y,
    }
    this.tile = {
      x: tile_x,
      y: tile_y,
    }
  }

  public draw() {
    const { player, keys, viewport, config, context } = GloablState

    const frame = player.movement.moving
      ? keys[player.movement.key].f[player.movement.frame]
      : keys[player.movement.key].f[1]
    const pos_x = Math.round(
      player.pos.x -
        viewport.getPosition().x +
        config.browserDimension.width / 2 -
        viewport.getDimension().width / 2,
    )
    const pos_y = Math.round(
      player.pos.y -
        viewport.getPosition().y +
        config.browserDimension.height / 2 -
        viewport.getDimension().height / 2,
    )

    this.light(pos_x, pos_y)
    this.torch_func()

    context.drawImage(
      this.sprite,
      frame * config.size.char,
      0,
      config.size.char,
      config.size.char,
      pos_x,
      pos_y,
      config.size.char,
      config.size.char,
    )
  }

  public light(pos_x: number, pos_y: number) {
    const { config, context } = GloablState

    const light_x = pos_x + config.size.tile / 2
    const light_y = pos_y + config.size.tile / 2

    const radius = 100
    const radialGradient = context.createRadialGradient(
      light_x,
      light_y,
      0,
      light_x,
      light_y,
      radius,
    )

    radialGradient.addColorStop(0, 'rgba(238, 229, 171, 0.325)')
    radialGradient.addColorStop(1, 'rgba(238, 229, 171, 0)')

    context.fillStyle = radialGradient
    context.arc(light_x, light_y, radius, 0, Math.PI * 2)
    context.fill()
  }

  public torch_func() {
    const { config, context } = GloablState
    if (this.torch.lit) {
      for (let y = 0; y < config.tiles.y; y++) {
        for (let x = 0; x < config.tiles.x; x++) {
          const distance = Math.sqrt(
            Math.pow(x - config.center.x, 2) + Math.pow(y - config.center.y, 2),
          )
          const opacity = distance / 4 - this.frames[this.torch.frame]

          context.fillStyle = 'rgba(0, 0, 0, ' + opacity + ')'
          context.fillRect(
            x * config.size.tile - config.size.tile / 2,
            y * config.size.tile - config.size.tile / 2,
            config.size.tile,
            config.size.tile,
          )
        }
      }
    }
  }

  public frame() {
    const player = GloablState.player

    this.movement.frame++

    if (this.movement.frame == 4) {
      this.movement.frame = 0
    }

    this.torch.frame++

    if (this.torch.frame == this.frames.length) {
      this.torch.frame = 0
    }

    player.movement.frame = this.movement.frame
    player.torch = this.torch
  }

  public move(x: number, y: number) {
    const { config, map } = GloablState

    const pos = {
      x: Math.ceil(this.pos.x / config.size.tile),
      y: Math.ceil(this.pos.y / config.size.tile),
    }

    const new_pos = {
      x: Math.ceil((this.pos.x + x) / config.size.tile),
      y: Math.ceil((this.pos.y + y) / config.size.tile),
    }

    for (let i = 0; i <= 1; i++) {
      const tile =
        (i == 0
          ? map.data.layout[pos.y][new_pos.x]
          : map.data.layout[new_pos.y][pos.x]) - 1
      const collision = map.data.assets[tile].collision

      if (!collision) {
        if (i == 0) {
          this.pos.x += x
          this.tile.x = new_pos.x
        } else {
          this.pos.y += y
          this.tile.y = new_pos.y
        }
      }
    }
  }
}
