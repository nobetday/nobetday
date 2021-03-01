import { GetStaticProps, NextPage } from 'next'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { getFeaturedQuote, getOtherQuotes, getQuotes, Quote } from '@/resources/quote-data'
import { QuoteDisplay } from '@/resources/quote-display'

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

  return {
    props: {
      featuredQuote: getFeaturedQuote(quotes),
      otherQuotes: getOtherQuotes(quotes),
    },
  }
}
