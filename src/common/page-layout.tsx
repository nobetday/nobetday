import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { Navbar } from '@/common/navbar'
import { PageFooter } from '@/common/page-footer'
import { PageHead } from '@/common/page-head'

export interface PageLayoutProps {
  readonly title: string
  readonly subtitle?: string
}

export const PageLayout: FunctionComponent<PageLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <>
      <PageHead title={title} />
      <Navbar />
      <header className='mt-5'>
        <ContentBox>
          <section className='section'>
            <h1 className='title is-1'>{title}</h1>
            {subtitle && <p className='subtitle is-3'>{subtitle}</p>}
          </section>
        </ContentBox>
      </header>
      <main>{children}</main>
      <PageFooter className='mt-6' />
    </>
  )
}
