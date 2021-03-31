import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { PageModal } from '@/common/page-modal'
import { Pagination } from '@/common/pagination'
import { getQueryValue } from '@/common/query'
import { getQuotesInOrder, getTotalQuotePages, quoteDescription, quotesPerPage } from '@/quote/quote-data'
import { QuoteDisplay } from '@/quote/quote-display'
import { Quote } from '@/quote/quote-model'

const quotes = getQuotesInOrder()
const totalQuotePages = getTotalQuotePages()

export interface QuoteListPageProps {
  readonly pageId: number
}

export const QuoteListPage: NextPage<QuoteListPageProps> = ({ pageId }) => {
  const router = useRouter()
  const [selectedQuote, setSelectedQuote] = useState<Quote>()
  const quotesOfPage = quotes.slice((pageId - 1) * quotesPerPage, pageId * quotesPerPage)

  const handleSelectedQuoteClose = () => {
    router.push('/quotes')
  }

  useEffect(() => {
    const selectedQuoteId = getQueryValue(router.query.id)
    setSelectedQuote(quotes.find((quote) => quote.id === selectedQuoteId))
  }, [router.query.id])

  return (
    <PageLayout title='Quotes' subtitle={quoteDescription}>
      <NextSeo
        description={quoteDescription}
        canonical='https://nobetday.com/quotes'
        openGraph={{
          url: 'https://nobetday.com/quotes',
          title: 'Quotes',
          description: `${quoteDescription}`,
        }}
      />
      <ContentBox>
        {selectedQuote && (
          <PageModal onClose={handleSelectedQuoteClose}>
            <section className='section'>
              <QuoteDisplay quote={selectedQuote} />
            </section>
          </PageModal>
        )}
        {quotesOfPage.map((quote) => (
          <section key={quote.id} className='section'>
            <QuoteDisplay quote={quote} />
          </section>
        ))}
        <Pagination
          previousPath={pageId > 1 ? (pageId === 2 ? '/quotes' : `/quotes/p/${pageId - 1}`) : undefined}
          nextPath={pageId < totalQuotePages ? `/quotes/p/${pageId + 1}` : undefined}
        />
      </ContentBox>
    </PageLayout>
  )
}
