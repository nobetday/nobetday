import { NextPage } from 'next'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'

export const HomePage: NextPage = () => {
  return (
    <PageLayout title='Home' isHeaderEnabled={false}>
      <section className='hero is-dark is-medium'>
        <div className='hero-body'>
          <ContentBox>
            <h1 className='title'>Resources and Tools for Quitting Gambling</h1>
          </ContentBox>
        </div>
      </section>
    </PageLayout>
  )
}
