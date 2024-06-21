import { Accessor, createContext } from 'solid-js'

import { Profile } from '../types/profile'

type AuthContextState = {
  isAuth: Accessor<boolean>,
  token: Accessor<string | null>,
  profile: Accessor<Profile | null>,
  setToken: (token: string) => void,
  setProfile: (profile: Profile) => void,
  clearToken: () => void
}

const AuthContext = createContext<AuthContextState>()

export default AuthContext
