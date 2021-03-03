import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { getQueryValue } from '@/common/query'
import { getFeaturedQuote, getOtherQuotes, getQuoteById, getQuotes, Quote } from '@/resources/quote-data'
import { QuoteDisplay } from '@/resources/quote-display'

import { QuoteModal } from './quote-modal'

export interface QuoteListPageProps {
  readonly featuredQuote: Quote
  readonly otherQuotes: Quote[]
}

export const QuoteListPage: NextPage<QuoteListPageProps> = ({ featuredQuote, otherQuotes }) => {
  const router = useRouter()
  const [selectedQuote, setSelectedQuote] = useState<Quote>()
  useEffect(() => {
    const id = getQueryValue(router.query.id)
    if (id) {
      setSelectedQuote(getQuoteById(id))
    }
  }, [router])
  return (
    <PageLayout title='Quotes'>
      <ContentBox>
        {selectedQuote && <QuoteModal quote={selectedQuote} />}
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

export const getQuoteListPageStaticProps: GetStaticProps = async (context) => {
  const quotes = getQuotes()
  return {
    props: {
      featuredQuote: getFeaturedQuote(quotes),
      otherQuotes: getOtherQuotes(quotes),
    },
  }
}
