import { NextPage } from 'next'

import { ButtonLink } from '@/common/button-link'
import { ContentBox } from '@/common/content-box'
import { Navbar } from '@/common/navbar'
import { PageFooter } from '@/common/page-footer'
import { PageHead } from '@/common/page-head'
import { getQuotesInOrder } from '@/resources/quote-data'
import { QuoteDisplay } from '@/resources/quote-display'
import { getStoriesInOrder } from '@/resources/story-data'
import { StoryDisplay } from '@/resources/story-display'

const latestStory = getStoriesInOrder()[0]
const latestQuote = getQuotesInOrder()[0]

export const HomePage: NextPage = () => {
  return (
    <>
      <PageHead title='Home' />
      <Navbar />
      <main>
        <section className='hero is-info is-medium'>
          <div className='hero-body'>
            <ContentBox>
              <h1 className='title'>Resources and Tools for Quitting Gambling</h1>
            </ContentBox>
          </div>
        </section>
        <ContentBox className='mt-6'>
          <h2 className='title is-1 mb-2'>Stories</h2>
          <section className='section'>
            <StoryDisplay story={latestStory} />
            <div className='block has-text-right'>
              <ButtonLink href='/stories' className='is-primary'>
                VIEW ALL STORIES
              </ButtonLink>
            </div>
          </section>
        </ContentBox>
        <ContentBox className='mt-4'>
          <h2 className='title is-1 mb-2'>Quotes</h2>
          <section className='section'>
            <QuoteDisplay quote={latestQuote} />
            <div className='block has-text-right'>
              <ButtonLink href='/quotes' className='is-primary'>
                VIEW ALL QUOTES
              </ButtonLink>
            </div>
          </section>
        </ContentBox>
      </main>
      <PageFooter />
    </>
  )
}
