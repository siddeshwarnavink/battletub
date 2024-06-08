import { Component, onCleanup, onMount } from 'solid-js'

import { initilize } from '../game/main'
import styles from './Game.module.scss'

const Game: Component = () => {
  let game: HTMLCanvasElement
  let oldBackground: string

  onMount(() => {
    oldBackground = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#000'
    initilize(game)

    onCleanup(() => (document.body.style.backgroundColor = oldBackground))
  })

  return (
    <>
      <canvas
        ref={(el) => (game = el)}
        class={styles.gameboard}
      />
    </>
  )
}

export default Game
