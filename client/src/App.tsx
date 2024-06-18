import { Route, Router } from '@solidjs/router'
import { type Component,lazy } from 'solid-js'

import Auth from './pages/Auth'
import Home from './pages/Home'

const Game = lazy(() => import('./pages/Game'))

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
