import { NextPage } from 'next'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { AuthAlert } from '@/user/auth-alert'
import { useAuthActions, useAuthState } from '@/user/auth-context'
import { AuthReady } from '@/user/auth-ready'
import { getNameFromId } from '@/user/auth-user'

export const AccountPage: NextPage = () => {
  const { user } = useAuthState()
  const { signOut } = useAuthActions()

  return (
    <PageLayout title='Account' subtitle={user ? getNameFromId(user.id) : undefined}>
      <ContentBox>
        <AuthReady>
          {user ? (
            <section className='section'>
              <button onClick={signOut} className='button is-dark'>
                SIGN OUT
              </button>
            </section>
          ) : (
            <AuthAlert />
          )}
        </AuthReady>
      </ContentBox>
    </PageLayout>
  )
}
