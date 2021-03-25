import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { getTotalQuotePages } from '@/resources/quote-data'
import { QuoteListPage, QuoteListPageProps } from '@/resources/quote-list-page'

export default QuoteListPage

export interface QuoteListPageParams extends ParsedUrlQuery {
  readonly quotePageId: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalQuotePages = getTotalQuotePages()
  const paths = Array.from({ length: totalQuotePages }, (_, pageIndex) => ({
    params: { quotePageId: `${pageIndex + 1}` },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<QuoteListPageProps, QuoteListPageParams> = async ({ params }) => {
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
