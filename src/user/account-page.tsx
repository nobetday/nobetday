import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { FunctionComponent, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { AuthAlert } from '@/user/auth-alert'
import { useAuthActions, useAuthState } from '@/user/auth-context'
import { AuthReady } from '@/user/auth-ready'
import { getNameFromId } from '@/user/auth-user'

interface EmailFieldProps {
  readonly email?: string
}

const EmailField: FunctionComponent<EmailFieldProps> = ({ email }) => {
  const [isVisible, setVisible] = useState(false)
  const toggleVisible = () => {
    setVisible(!isVisible)
  }

  if (!email) {
    return <></>
  }

  return (
    <div className='field'>
      <label className='label is-medium'>Email</label>
      <div className='control'>
        <button onClick={toggleVisible} className='button is-small'>
          <span className='icon'>
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </span>
        </button>
        <span className='ml-3'>{isVisible ? email : '*****'}</span>
      </div>
    </div>
  )
}

export const AccountPage: NextPage = () => {
  const { user } = useAuthState()
  const { signOut } = useAuthActions()

  return (
    <PageLayout title='Account' subtitle={user ? getNameFromId(user.id) : undefined}>
      <NextSeo noindex nofollow />
      <ContentBox>
        <AuthReady>
          {user ? (
            <section className='section'>
              <div className='block'>
                <EmailField email={user.hiddenInfo.email} />
              </div>
              <div className='block'>
                <button onClick={signOut} className='button is-dark'>
                  SIGN OUT
                </button>
              </div>
            </section>
          ) : (
            <AuthAlert />
          )}
        </AuthReady>
      </ContentBox>
    </PageLayout>
  )
}
