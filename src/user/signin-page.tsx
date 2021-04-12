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
import { redirectUrlParam, useAuthState } from '@/user/auth-context'
import { AuthReady } from '@/user/auth-ready'
import { AuthUser, getNameFromId } from '@/user/auth-user'
import { SignInWithEmailBlock } from '@/user/signin-with-email'
import { SignInWithGoogleButton } from '@/user/signin-with-google'
import { SignOutButton } from '@/user/signout-button'

const AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

interface UserSummaryProps {
  readonly user: AuthUser
}

const UserSummary: FunctionComponent<UserSummaryProps> = ({ user }) => {
  return (
    <div className='block'>
      <p className='subtitle is-4'>
        <TextLink href='/account'>{getNameFromId(user.id)}</TextLink>
      </p>
      <SignOutButton />
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
      {!AUTH_DOMAIN && (
        <div className='block'>
          <p className='has-text-grey'>Note: Third-party cookies must be enabled.</p>
        </div>
      )}
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
