import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FunctionComponent, useState } from 'react'

import { firebaseAuth } from '@/common/firebase'

export const SignInWithGoogleButton: FunctionComponent = () => {
  const [isLoading, setLoading] = useState(false)
  const handleClick = async () => {
    setLoading(true)
    const provider = new firebaseAuth.GoogleAuthProvider()
    await firebaseAuth().signInWithRedirect(provider)
  }

  return (
    <div className='block'>
      <button onClick={handleClick} className={clsx('button is-dark is-fullwidth', isLoading && 'is-loading')}>
        <span className='icon is-small'>
          <FontAwesomeIcon icon={faGoogle} />
        </span>
        <span>Sign in with Google</span>
      </button>
    </div>
  )
}
