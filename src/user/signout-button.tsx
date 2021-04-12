import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAuthActions } from '@/user/auth-context'

export const SignOutButton = () => {
  const { signOut } = useAuthActions()

  return (
    <button onClick={signOut} className='button is-light'>
      <span className='icon'>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </span>
      <span>SIGN OUT</span>
    </button>
  )
}
