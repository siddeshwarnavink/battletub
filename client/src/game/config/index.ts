import { IConfig } from '../types/config'

const config: IConfig = {
  win: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  tiles: {
    x: Math.ceil(window.innerWidth / 64) + 2,
    y: Math.ceil(window.innerHeight / 64) + 2,
  },
  center: {
    x: Math.round(window.innerWidth / 64) / 2,
    y: Math.round(window.innerHeight / 64) / 2,
  },
  size: {
    tile: 64,
    char: 96,
  },
  speed: 5,
}

export default config
