import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { PageModal } from '@/common/page-modal'
import { getQueryValue } from '@/common/query'
import { getQuotesInOrder, Quote } from '@/resources/quote-data'
import { QuoteDisplay } from '@/resources/quote-display'

const quotes = getQuotesInOrder()

export const QuoteListPage: NextPage = () => {
  const router = useRouter()
  const [selectedQuote, setSelectedQuote] = useState<Quote>()
  const handleSelectedQuoteClose = () => {
    router.push('/quotes')
  }

  useEffect(() => {
    const selectedQuoteId = getQueryValue(router.query.id)
    setSelectedQuote(quotes.find((quote) => quote.id === selectedQuoteId))
  }, [router.query.id])

  return (
    <PageLayout title='Quotes'>
      <ContentBox>
        {selectedQuote && (
          <PageModal onClose={handleSelectedQuoteClose}>
            <QuoteDisplay quote={selectedQuote} />
          </PageModal>
        )}
        {quotes.map((quote) => (
          <QuoteDisplay key={quote.id} quote={quote} />
        ))}
      </ContentBox>
    </PageLayout>
  )
}
