import { Route,Router } from '@solidjs/router'
import type { Component } from 'solid-js'

import Game from './pages/Game'
import Home from './pages/Home'

const App: Component = () => {
  return (
    <Router>
      <Route path='/' component={Home} />
      <Route path='/play' component={Game} />
    </Router>
  )
}

export default App
