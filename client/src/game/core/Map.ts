import { GloablState } from '../types/globalState'

export class Map {
    public data: any = {}
    private tiles: any[] = []
    private timer: ReturnType<typeof setInterval>

    constructor(title: string) {
        this.timer = setInterval(() => GloablState.map.frame(), 750)
        this.load(title)
    }

    public load(title: string) {
        const map = this
        const { Loop } = GloablState

        fetch('/game-assets/json/' + title.toString().toLowerCase() + '.json')
            .then(response => response.json())
            .then(data => {
                this.data = data
                this.data.frame = 0

                let init = false
                let loaded = 0

                for (let i = 0; i < map.data.assets.length; i++) {
                    map.tiles.push(new Image())
                    map.tiles[i].src = '/game-assets/img/tile/' + map.data.assets[i].file_name + '.png?v=' + new Date().getTime()

                    map.tiles[i].onload = function () {
                        loaded++

                        if (!init && loaded == map.data.assets.length) {
                            init = true
                            if (Loop)
                                Loop()
                        }
                    }
                }
            })
    }

    public draw() {
        const { viewport, map, config, context } = GloablState

        let x_min = Math.floor(viewport.x / config.size.tile)
        let y_min = Math.floor(viewport.y / config.size.tile)
        let x_max = Math.ceil((viewport.x + viewport.width) / config.size.tile)
        let y_max = Math.ceil((viewport.y + viewport.height) / config.size.tile)

        if (x_min < 0) { x_min = 0 }
        if (y_min < 0) { y_min = 0 }
        if (x_max > map.data.width) { x_max = map.data.width }
        if (y_max > map.data.height) { y_max = map.data.height }

        for (let y = y_min; y < y_max; y++) {
            for (let x = x_min; x < x_max; x++) {
                const value = this.data.layout[y][x] - 1
                const tile_x = Math.floor((x * config.size.tile) - viewport.x + (config.win.width / 2) - (viewport.width / 2))
                const tile_y = Math.floor((y * config.size.tile) - viewport.y + (config.win.height / 2) - (viewport.height / 2))

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
                        config.size.tile
                    )
                }
            }
        }
    }

    public frame() {
        this.data.frame = (this.data.frame == 0) ? 1 : 0
    }
}