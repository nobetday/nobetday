import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { getTotalQuotePages } from '@/quote/quote-data'
import { QuoteListPageProps } from '@/quote/quote-list-page'

export interface QuoteListPageParams extends ParsedUrlQuery {
  readonly quotePageId: string
}

export const getQuoteListPageStaticPaths: GetStaticPaths = async () => {
  const totalQuotePages = getTotalQuotePages()
  const paths = Array.from({ length: totalQuotePages }, (_, pageIndex) => ({
    params: { quotePageId: `${pageIndex + 1}` },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getQuoteListPageStaticProps: GetStaticProps<QuoteListPageProps, QuoteListPageParams> = async ({
  params,
}) => {
  const quotePageId = params && params.quotePageId

  if (!quotePageId) {
    return {
      notFound: true,
    }
  }

  return {
    props: { pageId: +quotePageId },
  }
}

export const getFirstQuoteListPageStaticProps: GetStaticProps<QuoteListPageProps> = async () => {
  return {
    props: { pageId: 1 },
  }
}
