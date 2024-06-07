import type { Component } from 'solid-js';

import styles from './App.module.scss'

const App: Component = () => {
  return (
    <div class={styles.wrapper}>
      <h1>BattleTub 2D</h1>
      <button class='nes-btn is-primary'>Play Now</button>
    </div>
  );
};

export default App;
