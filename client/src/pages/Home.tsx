import { A } from '@solidjs/router'
import type { Component } from 'solid-js'

import styles from './Home.module.scss'

const Home: Component = () => {
  return (
    <div class={styles.wrapper}>
      <h1>BattleTub 2D</h1>
      <A
        href="/play"
        class="nes-btn is-primary"
      >
        Play Now
      </A>
    </div>
  )
}

export default Home
