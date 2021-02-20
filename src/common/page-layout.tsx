import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { Navbar } from '@/common/navbar'
import { PageFooter } from '@/common/page-footer'
import { PageHead } from '@/common/page-head'

export interface PageLayoutProps {
  readonly title: string
}

export const PageLayout: FunctionComponent<PageLayoutProps> = ({ title, children }) => {
  return (
    <>
      <PageHead title={title} />
      <Navbar />
      <header className='mt-6'>
        <ContentBox>
          <h1 className='title is-1'>{title}</h1>
        </ContentBox>
      </header>
      <main className='my-5'>{children}</main>
      <PageFooter />
    </>
  )
}
