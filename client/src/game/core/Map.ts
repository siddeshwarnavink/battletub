import { GloablState } from '../types/globalState'
import { IMapdata } from '../types/mapData'

export class Map {
  private tiles: HTMLImageElement[] = []

  constructor(public data: IMapdata) {
    setInterval(() => GloablState.map.frame(), 750)
    this.load()
  }

  private load() {
    const { Loop } = GloablState

    this.data.frame = 0

    let init = false
    let loaded = 0

    for (let i = 0; i < this.data.assets.length; i++) {
      this.tiles.push(new Image())
      this.tiles[i].src =
        '/game-assets/img/tile/' +
        this.data.assets[i].file_name +
        '.png?v=' +
        new Date().getTime()

      this.tiles[i].onload = () => {
        loaded++

        if (!init && loaded == this.data.assets.length) {
          init = true
          if (Loop) Loop()
        }
      }
    }
  }

  public draw() {
    const { viewport, map, config, context } = GloablState

    let x_min = Math.floor(viewport.getPosition().x / config.size.tile)
    let y_min = Math.floor(viewport.getPosition().y / config.size.tile)
    let x_max = Math.ceil(
      (viewport.getPosition().x + viewport.getDimension().width) /
        config.size.tile,
    )
    let y_max = Math.ceil(
      (viewport.getPosition().y + viewport.getDimension().height) /
        config.size.tile,
    )

    if (x_min < 0) {
      x_min = 0
    }
    if (y_min < 0) {
      y_min = 0
    }
    if (x_max > parseInt(this.data.width)) {
      x_max = parseInt(this.data.width)
    }
    if (y_max > parseInt(this.data.height)) {
      y_max = parseInt(this.data.height)
    }

    for (let y = y_min; y < y_max; y++) {
      for (let x = x_min; x < x_max; x++) {
        const value = this.data.layout[y][x] - 1
        const tile_x = Math.floor(
          x * config.size.tile -
            viewport.getPosition().x +
            config.browserDimension.width / 2 -
            viewport.getDimension().width / 2,
        )
        const tile_y = Math.floor(
          y * config.size.tile -
            viewport.getPosition().y +
            config.browserDimension.height / 2 -
            viewport.getDimension().height / 2,
        )

        if (value > -1) {
          let frame = this.data.frame

          if (frame > this.data.assets[value].frames) {
            frame = 0
          }

          context.drawImage(
            map.tiles[value],
            frame * config.size.tile,
            0,
            config.size.tile,
            config.size.tile,
            tile_x,
            tile_y,
            config.size.tile,
            config.size.tile,
          )
        }
      }
    }
  }

  public frame() {
    this.data.frame = this.data.frame == 0 ? 1 : 0
  }
}
