import { FunctionComponent } from 'react'

import { useAuthActions } from '@/user/auth-context'

export const AuthAlert: FunctionComponent = () => {
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
