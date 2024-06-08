import { IKeyMapping } from '../types/keymapping'
import config from '.'

const keymapping: IKeyMapping = {
  // left:
  37: {
    x: config.speed,
    y: 0,
    a: false,
    f: [6, 7, 8, 7],
  },
  // up:
  38: {
    x: 0,
    y: config.speed,
    a: false,
    f: [3, 4, 5, 4],
  },
  // right:
  39: {
    x: config.speed,
    y: 0,
    a: false,
    f: [9, 10, 11, 10],
  },
  // down:
  40: {
    x: 0,
    y: config.speed,
    a: false,
    f: [0, 1, 2, 1],
  },
}

export default keymapping
