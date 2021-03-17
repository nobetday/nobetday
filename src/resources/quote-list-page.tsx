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
            <section className='section'>
              <QuoteDisplay quote={selectedQuote} />
            </section>
          </PageModal>
        )}
        {quotes.map((quote) => (
          <section key={quote.id} className='section'>
            <QuoteDisplay quote={quote} />
          </section>
        ))}
      </ContentBox>
    </PageLayout>
  )
}
