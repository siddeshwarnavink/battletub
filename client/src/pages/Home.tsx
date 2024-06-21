import { A } from '@solidjs/router'
import { type Component, useContext } from 'solid-js'

import AuthContext from '../context/Auth'
import styles from './Home.module.scss'

const Home: Component = () => {
  const authCtx = useContext(AuthContext)  
  return (
    <div class={styles.wrapper}>
      <h1>Hello, {authCtx?.profile()?.name}</h1>
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
