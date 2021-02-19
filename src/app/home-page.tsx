import { NextPage } from 'next'

import { ContentBox } from '@/common/content-box'
import { Navbar } from '@/common/navbar'
import { PageFooter } from '@/common/page-footer'
import { PageHead } from '@/common/page-head'

export const HomePage: NextPage = () => {
  return (
    <>
      <PageHead title='Home' />
      <Navbar />
      <main>
        <section className='hero is-dark is-medium'>
          <div className='hero-body'>
            <ContentBox>
              <h1 className='title'>Resources and Tools for Quitting Gambling</h1>
            </ContentBox>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  )
}
