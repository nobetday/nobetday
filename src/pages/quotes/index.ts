import { GetStaticProps } from 'next'

import { QuoteListPage, QuoteListPageProps } from '@/resources/quote-list-page'

export const getStaticProps: GetStaticProps<QuoteListPageProps> = async () => {
  return {
    props: { page: 1 },
  }
}

export default QuoteListPage
