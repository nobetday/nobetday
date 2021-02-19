import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageHead } from '@/common/page-head'
import { uiConstants } from '@/common/ui-constants'

export interface PageLayoutProps {
  readonly title: string
  readonly isHeaderEnabled?: boolean
}

export const PageLayout: FunctionComponent<PageLayoutProps> = ({ title, isHeaderEnabled = true, children }) => {
  return (
    <>
      <PageHead title={title} />
      {isHeaderEnabled && (
        <header className='mt-5'>
          <ContentBox>
            <h1 className='title is-1'>{title}</h1>
          </ContentBox>
        </header>
      )}
      <main className='my-5'>{children}</main>
      <footer className='has-background-light mt-6 mb-5'>
        <ContentBox className='py-6'>
          <strong className='ml-1'>{uiConstants.appName}</strong>
        </ContentBox>
      </footer>
    </>
  )
}
