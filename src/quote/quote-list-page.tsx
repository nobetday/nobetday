import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { PageModal } from '@/common/page-modal'
import { Pagination } from '@/common/pagination'
import { getQueryValue } from '@/common/query'
import { uiConstants } from '@/common/ui-constants'
import { getQuotesInOrder, getTotalQuotePages, quoteDescription, quotesPerPage } from '@/quote/quote-data'
import { QuoteDisplay } from '@/quote/quote-display'
import { Quote } from '@/quote/quote-model'

const quotes = getQuotesInOrder()
const totalQuotePages = getTotalQuotePages()
const quoteListPageTitle = 'Quotes'
const quoteListPageSeoProps: NextSeoProps = {
  title: quoteListPageTitle,
  description: quoteDescription,
  openGraph: {
    title: quoteListPageTitle,
    description: quoteDescription,
    images: [{ url: `${uiConstants.webUrl}/images/utYSgMOIm5w.jpeg` }],
  },
}

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
    <PageLayout title={quoteListPageTitle} subtitle={quoteDescription}>
      <NextSeo {...quoteListPageSeoProps} />
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
