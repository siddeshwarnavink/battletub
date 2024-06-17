import { Client } from '@stomp/stompjs'
import { Component, onCleanup, onMount } from 'solid-js'

import { initilize } from '../game/main'
import { IMapdata } from '../game/types/mapData'
import styles from './Game.module.scss'

const Game: Component = () => {
  let game: HTMLCanvasElement
  let oldBackground: string

  onMount(() => {
    oldBackground = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#000'

    fetch('/game-assets/json/map.json')
      .then((response) => response.json())
      .then((mapData: IMapdata) => initilize(game, mapData))

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        client.subscribe('/topic/public', message => {
          console.log(message)
        })
        client.publish({
          destination: '/app/game.movePlayer',
          body: JSON.stringify({
            x: 12.4,
            y: 13.5
          })
        })
      }
    })
    client.activate()

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
