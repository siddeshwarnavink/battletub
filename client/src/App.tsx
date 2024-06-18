import { Route, Router } from '@solidjs/router'
import type { Component } from 'solid-js'

import Auth from './pages/Auth'
import Game from './pages/Game'
import Home from './pages/Home'

const App: Component = () => {
  return (
    <Router>
      <Route
        path="/"
        component={Home}
      />
      <Route
        path="/auth"
        component={Auth}
      />

      <Route
        path="/play"
        component={Game}
      />
    </Router>
  )
}

export default App
