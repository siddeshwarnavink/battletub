import { createContext } from 'solid-js'

type AuthContextState = {
  isAuth: boolean,
  token: string | null,
  setToken: (token: string) => void,
  clearToken: () => void
}

const AuthContext = createContext<AuthContextState>()

export default AuthContext
