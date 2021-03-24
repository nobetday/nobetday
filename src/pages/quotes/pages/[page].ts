import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { getTotalPages, QuoteListPage, QuoteListPageProps } from '@/resources/quote-list-page'

export interface QuoteListPageParams extends ParsedUrlQuery {
  page: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = getTotalPages()
  const paths = Array.from(Array(totalPages).keys()).map((page) => ({ params: { page: `${page + 1}` } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<QuoteListPageProps> = async (context) => {
  const { page } = context.params as QuoteListPageParams
  const pageNumber = Number(page)
  if (pageNumber === 1) {
    return {
      redirect: {
        destination: '/quotes',
        permanent: false,
      },
    }
  }
  return {
    props: { page: pageNumber },
  }
}

export default QuoteListPage
