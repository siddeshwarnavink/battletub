import config from './config'
import keymapping from './config/keymapping'
import { Map } from './core/Map'
import { Player } from './core/Player'
import { Viewport } from './core/Viewport'
import { GloablState } from './types/globalState'


const loop = () => {
    window.requestAnimationFrame(loop)

    checkSizing()

    const { viewport, map, player } = GloablState

    viewport.center()
    map.draw()
    player.draw()
}



GloablState.config = config
GloablState.keys = keymapping
GloablState.viewport = new Viewport(0, 0, GloablState.config.win.width, GloablState.config.win.height)
GloablState.player = new Player(4, 4)
GloablState.map = new Map('Map')
GloablState.Loop = loop

export const initilize = (canvasEl: HTMLCanvasElement) => {
    const context = canvasEl.getContext('2d')

    if (context === null)
        throw new Error('Invalid canvas element')


    GloablState.context = context

    console.log('global state', GloablState)
    

    checkSizing()
    window.onresize = () => checkSizing()
    loop()
}

const checkSizing = () => {
    const { config, viewport, context } = GloablState

    config.win = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    config.tiles = {
        x: Math.ceil(config.win.width / config.size.tile),
        y: Math.ceil(config.win.height / config.size.tile)
    }

    config.center = {
        x: Math.round(config.tiles.x / 2),
        y: Math.round(config.tiles.y / 2)
    }

    viewport.x = 0
    viewport.y = 0
    viewport.width = config.win.width
    viewport.height = config.win.height

    context.canvas.width = config.win.width
    context.canvas.height = config.win.height
}

// player movement start:
document.addEventListener('keydown', (event) => {
    const { player, keys } = GloablState
    if (event.keyCode >= 37 && event.keyCode <= 40) {
        player.movement.moving = true
        player.movement.key = event.keyCode

        for (const key in keys) {
            if (key === event.keyCode.toString()) {
                keys[key].a = true
            }
        }
    }
    else {
        switch (event.keyCode) {
            case 84: // t
                player.torch.lit = (player.torch.lit) ? false : true
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
            player.movement.key = key
            found = true
        }
    }

    if (!found) {
        player.movement.moving = false
    }
})