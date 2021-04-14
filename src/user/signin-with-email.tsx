import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { ChangeEvent, FunctionComponent, KeyboardEvent, useEffect, useState } from 'react'
import store from 'store2'

import { AlertMessage } from '@/common/alert-message'
import { firebaseAuth } from '@/common/firebase'

const EMAIL_FOR_SIGN_IN = 'EMAIL_FOR_SIGN_IN'

const checkSignInWithEmail = async (setMessage: (message: AlertMessage | undefined) => void) => {
  if (!firebaseAuth().isSignInWithEmailLink(window.location.href)) {
    return
  }

  const email = store.get(EMAIL_FOR_SIGN_IN)
  if (!email) {
    setMessage({ content: 'Please enter your email to continue.', type: 'is-info' })
    return
  }

  setMessage({ content: 'Authenticating...', type: 'is-info' })
  try {
    await firebaseAuth().signInWithEmailLink(email, window.location.href)
  } catch (err) {
    setMessage({ content: err.message, type: 'is-danger' })
  }
  store.remove(EMAIL_FOR_SIGN_IN)
}

const signInWithEmail = async (
  email: string,
  setLoading: (value: boolean) => void,
  setMessage: (message: AlertMessage | undefined) => void,
) => {
  setLoading(true)
  setMessage(undefined)
  try {
    if (firebaseAuth().isSignInWithEmailLink(window.location.href)) {
      await firebaseAuth().signInWithEmailLink(email, window.location.href)
    } else {
      await firebaseAuth().sendSignInLinkToEmail(email, {
        url: window.location.href,
        handleCodeInApp: true,
      })
      store.set(EMAIL_FOR_SIGN_IN, email)
      setMessage({ content: 'Please check your email to continue.', type: 'is-info' })
    }
  } catch (err) {
    setMessage({ content: err.message, type: 'is-danger' })
  }
  setLoading(false)
}

interface SignInWithEmailFormProps {
  readonly email: string
  readonly setEmail: (value: string) => void
  readonly isLoading: boolean
  readonly onSubmit: () => void
}

const SignInWithEmailForm: FunctionComponent<SignInWithEmailFormProps> = ({ email, setEmail, isLoading, onSubmit }) => {
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <>
      <div className='field'>
        <div className='control has-icons-left'>
          <input
            className='input'
            type='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <span className='icon is-small is-left'>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <button onClick={onSubmit} className={clsx('button is-primary is-fullwidth', isLoading && 'is-loading')}>
            Sign in with Email
          </button>
        </div>
      </div>
    </>
  )
}

export const SignInWithEmailBlock: FunctionComponent = () => {
  const [message, setMessage] = useState<AlertMessage | undefined>()
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    await signInWithEmail(email, setLoading, setMessage)
  }

  useEffect(() => {
    checkSignInWithEmail(setMessage)
    // Check sign in with email only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='block'>
      {message && (
        <div className={clsx('notification', message.type)}>
          <p className='is-size-5'>{message.content}</p>
        </div>
      )}
      <SignInWithEmailForm email={email} setEmail={setEmail} isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  )
}
