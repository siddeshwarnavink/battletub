import { Route, Router } from '@solidjs/router'
import { type Component, createEffect, createSignal, lazy, Show } from 'solid-js'

import AuthContext from './context/Auth'
import useErrorModal from './hooks/useErrorModal'
import graphqlService from './services/graphql'
import { type Profile } from './types/profile'

const Auth = lazy(() => import('./pages/Auth'))
const Home = lazy(() => import('./pages/Home'))
const Game = lazy(() => import('./pages/Game'))

const App: Component = () => {
  const [loading, setLoading] = createSignal<boolean>(true)
  const [authToken, setAuthToken] = createSignal<string | null>(null)
  const [profile, setProfile] = createSignal<Profile | null>(null)
  const { setError, errorModal } = useErrorModal()
  createEffect(async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const data = await graphqlService<{
          authorize: {
            token: string,
            player: Profile
          }
        }>({
          query: `
            query Authorize($token: String!) {
              authorize(token: $token) {
                token,
                player {
                  id,
                  name,
                  score
                }
              }
            }
          `,
          variables: {
            token
          }
        })
        if (data.errors) {
          throw new Error(data.errors[0].message)
        }
        const newToken: string = data.data.authorize.token
        localStorage.setItem('token', newToken)
        setAuthToken(newToken)
        setProfile(data.data.authorize.player)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        setError(error.message)
      }

      setAuthToken(null)
      setLoading(false)
    }
  })

  return (
    <AuthContext.Provider value={{
      isAuth: () => authToken() != null,
      token: authToken,
      profile: profile,
      setToken: setAuthToken,
      setProfile,
      clearToken: () => setAuthToken(null),
    }}>
      <>
        {errorModal}
        <Router>
          <Show fallback={<p>loading...</p>} when={!loading()}>
            <Show when={authToken() !== null}>
              <Route
                path="/"
                component={Home}
              />
              <Route
                path="/play"
                component={Game}
              />
            </Show>
            <Show when={authToken() === null}>
              <Route
                path="*"
                component={Auth}
              />
            </Show>
          </Show>
        </Router>
      </>
    </AuthContext.Provider>
  )
}

export default App
