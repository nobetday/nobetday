import clsx from 'clsx'
import { randomInt } from 'd3-random'
import { GetStaticProps, NextPage } from 'next'
import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { getDailyRandomSource } from '@/common/random'
import { Quote, quotes } from '@/resources/quote-data'

export interface QuoteListPageProps {
  readonly quoteOfTheDay: Quote
  readonly otherQuotes: Quote[]
}

interface QuoteDisplayProps {
  readonly quote: Quote
  readonly isSpecial?: boolean
}

const QuoteDisplay: FunctionComponent<QuoteDisplayProps> = ({ quote, isSpecial = false }) => {
  return (
    <article className={clsx('message mb-5', isSpecial ? 'is-info is-large' : 'is-dark is-medium')}>
      <div className='message-header'>{quote.author}</div>
      <div className='message-body is-size-4'>{quote.content}</div>
    </article>
  )
}

export const QuoteListPage: NextPage<QuoteListPageProps> = ({ quoteOfTheDay, otherQuotes }) => {
  return (
    <PageLayout title='Quotes'>
      <ContentBox>
        <h2 className='subtitle is-2'>Quote of the Day</h2>
        <QuoteDisplay quote={quoteOfTheDay} isSpecial />
        <h2 className='subtitle is-2'>Other Quotes</h2>
        {otherQuotes.map((quote, index) => (
          <QuoteDisplay key={index} quote={quote} />
        ))}
      </ContentBox>
    </PageLayout>
  )
}

export const getQuoteListPageStaticProps: GetStaticProps = async () => {
  const quoteOfTheDayIndex = randomInt.source(getDailyRandomSource())(0, quotes.length)()

  return {
    props: {
      quoteOfTheDay: quotes[quoteOfTheDayIndex],
      otherQuotes: [...quotes.slice(quoteOfTheDayIndex + 1), ...quotes.slice(0, quoteOfTheDayIndex)],
    },
  }
}
