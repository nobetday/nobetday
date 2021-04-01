import { faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { NextSeo, NextSeoProps } from 'next-seo'
import { FunctionComponent, useEffect } from 'react'

import { ContentBox } from '@/common/content-box'
import { getQueryValue } from '@/common/query'
import { TextLink } from '@/common/text-link'
import { uiConstants } from '@/common/ui-constants'
import { redirectUrlParam, useAuthActions, useAuthState } from '@/user/auth-context'
import { AuthReady } from '@/user/auth-ready'
import { AuthUser, getNameFromId } from '@/user/auth-user'
import { SignInWithEmailBlock } from '@/user/sign-in-with-email'
import { SignInWithGoogleButton } from '@/user/sign-in-with-google'

interface UserSummaryProps {
  readonly user: AuthUser
}

const UserSummary: FunctionComponent<UserSummaryProps> = ({ user }) => {
  const { signOut } = useAuthActions()

  return (
    <div className='block'>
      <p className='subtitle is-4'>
        <TextLink href='/account'>{getNameFromId(user.id)}</TextLink>
      </p>
      <button onClick={signOut} className='button is-dark'>
        SIGN OUT
      </button>
    </div>
  )
}

const SignInBox: FunctionComponent = () => {
  return (
    <div style={{ width: 400, margin: '0 auto' }}>
      <SignInWithEmailBlock />
      <div className='block'>
        <span className='icon is-medium has-text-grey-light'>
          <FontAwesomeIcon icon={faSort} size='lg' />
        </span>
      </div>
      <SignInWithGoogleButton />
    </div>
  )
}

const checkRedirect = (router: NextRouter) => {
  const redirectUrl = getQueryValue(router.query[redirectUrlParam])
  if (redirectUrl) {
    router.replace(redirectUrl)
    return
  }

  const mode = getQueryValue(router.query.mode)
  if (mode === 'signIn') {
    router.replace('/')
    return
  }
}

const signinPageTitle = 'Sign In'
const signinPageDescription = `Sign in to ${uiConstants.appName}`
const signinPageSeoProps: NextSeoProps = {
  title: signinPageTitle,
  description: signinPageDescription,
  openGraph: {
    title: signinPageTitle,
    description: signinPageDescription,
  },
}

export const SignInPage: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthState()

  useEffect(() => {
    if (user) {
      checkRedirect(router)
    }
  }, [router, user])

  return (
    <>
      <NextSeo {...signinPageSeoProps} />
      <main>
        <ContentBox className='has-text-centered'>
          <div className='mb-6'>
            <TextLink href='/' className='title is-1 has-text-primary'>
              {uiConstants.appName}
            </TextLink>
          </div>
          <AuthReady>{user ? <UserSummary user={user} /> : <SignInBox />}</AuthReady>
        </ContentBox>
      </main>
    </>
  )
}
