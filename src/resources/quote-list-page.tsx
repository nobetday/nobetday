import clsx from 'clsx'
import { randomInt, randomLcg } from 'd3-random'
import { GetStaticProps, NextPage } from 'next'
import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { getQuotes, Quote } from '@/resources/quote-data'

interface QuoteDisplayProps {
  readonly quote: Quote
  readonly isFeatured?: boolean
}

const QuoteDisplay: FunctionComponent<QuoteDisplayProps> = ({ quote, isFeatured = false }) => {
  return (
    <article className={clsx('message', isFeatured ? 'is-info is-large' : 'is-dark is-medium')}>
      <div className='message-header'>{quote.author}</div>
      <div className='message-body is-size-4'>{quote.content}</div>
    </article>
  )
}

export interface QuoteListPageProps {
  readonly featuredQuote: Quote
  readonly otherQuotes: Quote[]
}

export const QuoteListPage: NextPage<QuoteListPageProps> = ({ featuredQuote, otherQuotes }) => {
  return (
    <PageLayout title='Quotes'>
      <ContentBox>
        <h2 className='subtitle is-2'>Featured Quote</h2>
        <QuoteDisplay quote={featuredQuote} isFeatured />
        <h2 className='subtitle is-2'>Other Quotes</h2>
        {otherQuotes.map((quote) => (
          <QuoteDisplay key={quote.id} quote={quote} />
        ))}
      </ContentBox>
    </PageLayout>
  )
}

export const getQuoteListPageStaticProps: GetStaticProps = async () => {
  const quotes = getQuotes()
  const featuredQuoteIndex = randomInt.source(randomLcg(quotes.length))(0, quotes.length)()
  const otherQuotes = [...quotes]
  otherQuotes.splice(featuredQuoteIndex, 1)

  return {
    props: {
      featuredQuote: quotes[featuredQuoteIndex],
      otherQuotes: otherQuotes.reverse(),
    },
  }
}
