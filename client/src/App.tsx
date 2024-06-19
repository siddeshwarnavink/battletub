import { Route, Router } from '@solidjs/router'
import { type Component, createSignal, lazy } from 'solid-js'

import AuthContext from './context/Auth'
import Auth from './pages/Auth'
import Home from './pages/Home'

const Game = lazy(() => import('./pages/Game'))

const App: Component = () => {
  const [authToken, setAuthToken] = createSignal<string | null>(null)
  return (
    <AuthContext.Provider value={{
      isAuth: authToken != null,
      token: authToken(),
      setToken: (token) => setAuthToken(token),
      clearToken: () => setAuthToken(null),
    }}>
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
    </AuthContext.Provider>
  )
}

export default App
