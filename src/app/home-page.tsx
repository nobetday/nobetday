import { NextPage } from 'next'
import { NextSeo, NextSeoProps } from 'next-seo'
import { FunctionComponent } from 'react'

import { ButtonLink } from '@/common/button-link'
import { ContentBox } from '@/common/content-box'
import { Navbar } from '@/common/navbar'
import { PageFooter } from '@/common/page-footer'
import { TextLink } from '@/common/text-link'
import { uiConstants } from '@/common/ui-constants'
import { getQuotesInOrder, quoteDescription } from '@/quote/quote-data'
import { QuoteDisplay } from '@/quote/quote-display'
import { getStoriesInOrder, storyDescription } from '@/story/story-data'
import { StoryDisplay } from '@/story/story-display'

const latestStory = getStoriesInOrder()[0]
const latestQuote = getQuotesInOrder()[0]

const homePageTitle = 'Home'
const homePageDescription = 'Quitting Gambling Inspiration'

const IntroSection: FunctionComponent = () => {
  return (
    <div className='has-background-info py-4'>
      <ContentBox>
        <section className='section is-medium has-text-centered'>
          <h1 className='title is-1 has-text-white'>{homePageDescription}</h1>
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

const homePageSeoProps: NextSeoProps = {
  title: homePageTitle,
  description: homePageDescription,
  openGraph: {
    title: homePageTitle,
    description: homePageDescription,
    images: [{ url: `${uiConstants.webUrl}/images/V3qzwMY2ak0.jpeg` }],
  },
}

export const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo {...homePageSeoProps} />
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
