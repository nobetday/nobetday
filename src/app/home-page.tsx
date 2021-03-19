import { NextPage } from 'next'
import { FunctionComponent } from 'react'

import { ButtonLink } from '@/common/button-link'
import { ContentBox } from '@/common/content-box'
import { Navbar } from '@/common/navbar'
import { PageFooter } from '@/common/page-footer'
import { PageHead } from '@/common/page-head'
import { TextLink } from '@/common/text-link'
import { getQuotesInOrder, quoteDescription } from '@/resources/quote-data'
import { QuoteDisplay } from '@/resources/quote-display'
import { getStoriesInOrder, storyDescription } from '@/resources/story-data'
import { StoryDisplay } from '@/resources/story-display'

const latestStory = getStoriesInOrder()[0]
const latestQuote = getQuotesInOrder()[0]

const IntroSection: FunctionComponent = () => {
  return (
    <div className='has-background-info py-4'>
      <ContentBox>
        <section className='section is-medium has-text-centered'>
          <h1 className='title is-1 has-text-white'>Quitting Gambling Inspiration</h1>
          <p className='is-size-4 has-text-white'>A little help on your journey of breaking free.</p>
        </section>
      </ContentBox>
    </div>
  )
}

const StorySection: FunctionComponent = () => {
  return (
    <>
      <section className='section'>
        <h2 className='title is-1'>
          <TextLink href='/stories' className='has-text-dark'>
            Stories
          </TextLink>
        </h2>
        <p className='subtitle is-3'>{storyDescription}</p>
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
        <h2 className='title is-1'>
          <TextLink href='/quotes' className='has-text-dark'>
            Quotes
          </TextLink>
        </h2>
        <p className='subtitle is-3'>{quoteDescription}</p>
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
        <ContentBox className='py-5'>
          <StorySection />
          <QuoteSection />
        </ContentBox>
      </main>
      <PageFooter />
    </>
  )
}
