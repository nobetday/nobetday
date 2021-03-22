import firebase from 'firebase/app'
import { useRouter } from 'next/router'
import { createContext, FunctionComponent, useContext, useEffect, useMemo, useState } from 'react'

import { AuthUser } from '@/user/auth-user'

export const redirectUrlParam = 'continue'

export interface AuthState {
  readonly isReady: boolean
  readonly user?: AuthUser
}

export interface AuthActions {
  readonly setUser: (user?: AuthUser) => void
  readonly signIn: () => void
  readonly signOut: () => Promise<void>
}

const useFirebaseAuthEffect = (authActions: AuthActions) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        authActions.setUser()
        return
      }

      const { uid } = firebaseUser
      authActions.setUser({ id: uid })
    })
    // Register auth state change handler only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

const useAuthContext = () => {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>({ isReady: false })

  const authActions: AuthActions = useMemo(
    () => ({
      setUser: (user?: AuthUser) => {
        setAuthState({ isReady: true, user })
      },
      signIn: () => {
        router.push(authState.user ? '/signin' : `/signin?${redirectUrlParam}=${encodeURIComponent(router.asPath)}`)
      },
      signOut: async () => {
        await firebase.auth().signOut()
      },
    }),
    [router, authState],
  )

  useFirebaseAuthEffect(authActions)

  return { authState, authActions }
}

const AuthStateContext = createContext<AuthState | undefined>(undefined)
const AuthActionsContext = createContext<AuthActions | undefined>(undefined)

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  const { authState, authActions } = useAuthContext()

  return (
    <AuthStateContext.Provider value={authState}>
      <AuthActionsContext.Provider value={authActions}>{children}</AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const useAuthState = (): AuthState => {
  const authState = useContext(AuthStateContext)
  if (!authState) {
    throw new Error('useAuthState must be used within AuthContextProvider')
  }
  return authState
}

export const useAuthActions = (): AuthActions => {
  const authActions = useContext(AuthActionsContext)
  if (!authActions) {
    throw new Error('useAuthActions must be used within AuthContextProvider')
  }
  return authActions
}
