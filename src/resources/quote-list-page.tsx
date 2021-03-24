import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { PageModal } from '@/common/page-modal'
import { getQueryValue } from '@/common/query'
import { getQuotesInOrder, Quote, quoteDescription } from '@/resources/quote-data'
import { QuoteDisplay } from '@/resources/quote-display'

const quotes = getQuotesInOrder()
const itemsPerPage = 10

export const getTotalPages = (): number => {
  return Math.ceil(quotes.length / itemsPerPage)
}

export interface QuoteListPageProps {
  readonly page: number
}

export const QuoteListPage: NextPage<QuoteListPageProps> = ({ page }) => {
  const router = useRouter()
  const [selectedQuote, setSelectedQuote] = useState<Quote>()
  const pagedQuotes = quotes.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const handleSelectedQuoteClose = () => {
    router.push('/quotes')
  }

  useEffect(() => {
    const selectedQuoteId = getQueryValue(router.query.id)
    setSelectedQuote(quotes.find((quote) => quote.id === selectedQuoteId))
  }, [router.query.id])

  return (
    <PageLayout title='Quotes' subtitle={quoteDescription}>
      <ContentBox>
        {selectedQuote && (
          <PageModal onClose={handleSelectedQuoteClose}>
            <section className='section'>
              <QuoteDisplay quote={selectedQuote} />
            </section>
          </PageModal>
        )}
        {pagedQuotes.map((quote) => (
          <section key={quote.id} className='section'>
            <QuoteDisplay quote={quote} />
          </section>
        ))}
        <nav className='pagination'>
          <a href={`/quotes/pages/${page - 1}`} className='pagination-previous' disabled={page === 1}>
            Previous
          </a>
          <a href={`/quotes/pages/${page + 1}`} className='pagination-next' disabled={page === getTotalPages()}>
            Next page
          </a>
        </nav>
      </ContentBox>
    </PageLayout>
  )
}
