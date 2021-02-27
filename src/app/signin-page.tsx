import { NextPage } from 'next'

import { ComingSoon } from '@/common/coming-soon'
import { ContentBox } from '@/common/content-box'
import { PageHead } from '@/common/page-head'
import { TextLink } from '@/common/text-link'
import { uiConstants } from '@/common/ui-constants'

export const SignInPage: NextPage = () => {
  return (
    <>
      <PageHead title='Sign In' />
      <main>
        <ContentBox className='has-text-centered block'>
          <TextLink href='/' className='is-size-1'>
            {uiConstants.appName}
          </TextLink>
        </ContentBox>
        <ComingSoon />
      </main>
    </>
  )
}
