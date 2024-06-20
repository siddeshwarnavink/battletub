import { createContext } from 'solid-js'

import { Profile } from '../types/profile'

type AuthContextState = {
  isAuth: boolean,
  token: string | null,
  profile: Profile | null,
  setToken: (token: string) => void,
  setProfile: (profile: Profile) => void,
  clearToken: () => void
}

const AuthContext = createContext<AuthContextState>()

export default AuthContext
