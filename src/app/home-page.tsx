import { NextPage } from 'next'
import { FunctionComponent } from 'react'

import { ButtonLink } from '@/common/button-link'
import { ContentBox } from '@/common/content-box'
import { Navbar } from '@/common/navbar'
import { PageFooter } from '@/common/page-footer'
import { PageHead } from '@/common/page-head'
import { TextLink } from '@/common/text-link'
import { getQuotesInOrder } from '@/resources/quote-data'
import { QuoteDisplay } from '@/resources/quote-display'
import { getStoriesInOrder } from '@/resources/story-data'
import { StoryDisplay } from '@/resources/story-display'

const latestStory = getStoriesInOrder()[0]
const latestQuote = getQuotesInOrder()[0]

const IntroSection: FunctionComponent = () => {
  return (
    <section className='hero is-info is-medium'>
      <div className='hero-body'>
        <ContentBox>
          <h1 className='title'>Resources and Tools for Quitting Gambling</h1>
        </ContentBox>
      </div>
    </section>
  )
}

const StorySection: FunctionComponent = () => {
  return (
    <>
      <section className='section'>
        <TextLink href='/stories'>
          <h2 className='title is-1'>Stories</h2>
        </TextLink>
      </section>
      <section className='section'>
        <StoryDisplay story={latestStory} />
        <div className='block has-text-right'>
          <ButtonLink href='/stories' className='is-outlined is-primary'>
            VIEW ALL STORIES
          </ButtonLink>
        </div>
      </section>
    </>
  )
}

const QuoteSection: FunctionComponent = () => {
  return (
    <>
      <section className='section'>
        <TextLink href='/quotes'>
          <h2 className='title is-1'>Quotes</h2>
        </TextLink>
      </section>
      <section className='section'>
        <QuoteDisplay quote={latestQuote} />
        <div className='block has-text-right'>
          <ButtonLink href='/quotes' className='is-outlined is-primary'>
            VIEW ALL QUOTES
          </ButtonLink>
        </div>
      </section>
    </>
  )
}

export const HomePage: NextPage = () => {
  return (
    <>
      <PageHead title='Home' />
      <Navbar />
      <main>
        <IntroSection />
        <ContentBox className='py-6'>
          <StorySection />
          <QuoteSection />
        </ContentBox>
      </main>
      <PageFooter />
    </>
  )
}
