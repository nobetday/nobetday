import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

import { useAuthActions, useAuthState } from '@/user/auth-context'

const SignInAlert: FunctionComponent = () => {
  const { signIn } = useAuthActions()

  return (
    <div className='notification is-info'>
      <p className='is-size-4'>
        Please{' '}
        <button onClick={signIn} className='button'>
          SIGN IN
        </button>{' '}
        to continue.
      </p>
    </div>
  )
}

export interface AuthReadyProps {
  readonly isAlertEnabled?: boolean
}

export const AuthReady: FunctionComponent<AuthReadyProps> = ({ isAlertEnabled = false, children }) => {
  const { isReady, user } = useAuthState()

  if (!isReady) {
    return (
      <div className='block has-text-grey has-text-centered'>
        <FontAwesomeIcon icon={faCompass} size='4x' spin />
      </div>
    )
  }

  if (!user && isAlertEnabled) {
    return <SignInAlert />
  }

  return <>{children}</>
}
