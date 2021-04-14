import { useRouter } from 'next/router'
import { createContext, FunctionComponent, useContext, useEffect, useMemo, useState } from 'react'

import { firebaseAuth } from '@/common/firebase'
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

const listenToAuthStateChange = (authActions: AuthActions) => {
  firebaseAuth().onAuthStateChanged(async (firebaseUser) => {
    if (!firebaseUser) {
      authActions.setUser()
      return
    }

    const { uid, email } = firebaseUser
    authActions.setUser({ id: uid, hiddenInfo: { email: email || undefined } })
  })
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
        await firebaseAuth().signOut()
      },
    }),
    [router, authState],
  )

  useEffect(() => {
    listenToAuthStateChange(authActions)
    // Register auth state change handler only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
