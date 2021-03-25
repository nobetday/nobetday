import { GetStaticProps } from 'next'

import { QuoteListPage, QuoteListPageProps } from '@/resources/quote-list-page'

export default QuoteListPage

export const getStaticProps: GetStaticProps<QuoteListPageProps> = async () => {
  return {
    props: { pageId: 1 },
  }
}
