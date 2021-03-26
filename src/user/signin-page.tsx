import firebase from 'firebase/app'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageHead } from '@/common/page-head'
import { getQueryValue } from '@/common/query'
import { TextLink } from '@/common/text-link'
import { uiConstants } from '@/common/ui-constants'
import { redirectUrlParam, useAuthActions, useAuthState } from '@/user/auth-context'
import { AuthReady } from '@/user/auth-ready'
import { AuthUser, getNameFromId } from '@/user/auth-user'

interface UserSummaryProps {
  readonly user: AuthUser
}

const UserSummary: FunctionComponent<UserSummaryProps> = ({ user }) => {
  const { signOut } = useAuthActions()

  return (
    <div className='block'>
      <p className='subtitle is-2'>{getNameFromId(user.id)}</p>
      <button onClick={signOut} className='button'>
        SIGN OUT
      </button>
    </div>
  )
}

const SignInWithGoogleButton: FunctionComponent = () => {
  const handleClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <div className='block'>
      <button onClick={handleClick} className='button is-medium'>
        Sign in with Google
      </button>
    </div>
  )
}

export const SignInPage: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthState()

  useEffect(() => {
    const redirectUrl = getQueryValue(router.query[redirectUrlParam])
    if (user && redirectUrl) {
      router.replace(redirectUrl)
    }
  }, [router, user])

  return (
    <>
      <PageHead title='Sign In' />
      <main>
        <ContentBox className='has-text-centered'>
          <div className='block'>
            <TextLink href='/' className='title is-1 has-text-primary'>
              {uiConstants.appName}
            </TextLink>
          </div>
          <AuthReady>
            {user ? (
              <UserSummary user={user} />
            ) : (
              <>
                <SignInWithGoogleButton />
              </>
            )}
          </AuthReady>
        </ContentBox>
      </main>
    </>
  )
}
