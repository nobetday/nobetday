import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

import { useAuthState } from '@/user/auth-context'

export const AuthReady: FunctionComponent = ({ children }) => {
  const { isReady } = useAuthState()

  if (isReady) {
    return <>{children}</>
  }

  return (
    <div className='block has-text-grey'>
      <FontAwesomeIcon icon={faCompass} size='4x' spin />
    </div>
  )
}
