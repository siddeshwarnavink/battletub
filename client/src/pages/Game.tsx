import { Client } from '@stomp/stompjs'
import { Component, onCleanup, onMount, useContext } from 'solid-js'

import AuthContext from '../context/Auth'
import { initilize } from '../game/main'
import { GloablState } from '../game/types/globalState'
import { IMapdata } from '../game/types/mapData'
import { IPosition } from '../game/types/position'
import graphqlService from '../services/graphql'
import styles from './Game.module.scss'

type PlayerDataQueryResult = {
  playerById: {
    id: string,
    position: IPosition
  }
}

const Game: Component = () => {
  const authCtx = useContext(AuthContext)
  let game: HTMLCanvasElement
  let oldBackground: string

  onMount(async () => {
    oldBackground = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#000'

    const response = await fetch('/game-assets/json/map.json')
    const mapData: IMapdata = await response.json()

    const profile = authCtx?.profile()
    if (profile) {
      const playerData = await graphqlService<PlayerDataQueryResult>({
        query: `
          query PlayerData($id: ID!) {
            playerById(id: $id) {
              id,
              position {
                x,
                y
              }
            }
          }
        `,
        variables: {
          id: profile?.id
        }
      })
      initilize(profile, game, mapData)
      if (!playerData.errors) {
        GloablState.player.move(playerData.data.playerById.position.x, playerData.data.playerById.position.y)
      }
    }

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws'
    })
    client.activate()


    GloablState.player.addEventListener('player:move', () => {
      client.publish({
        destination: '/app/game.movePlayer',
        body: JSON.stringify({
          playerId: GloablState.player.playerId,
          position: GloablState.player.pos
        })
      })
    })

    onCleanup(() => {
      client.forceDisconnect()
      document.body.style.backgroundColor = oldBackground
    })
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
