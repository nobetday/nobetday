import arrayShuffle from 'array-shuffle'
import { GetStaticProps, NextPage } from 'next'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { Quote, quoteData } from '@/resources/quote-data'

export interface QuoteListPageProps {
  readonly quotes: Quote[]
}

export const QuoteListPage: NextPage<QuoteListPageProps> = ({ quotes }) => {
  return (
    <PageLayout title='Quotes'>
      <ContentBox>
        {quotes.map((quote, index) => (
          <article key={index} className='message is-dark is-medium mb-5'>
            <div className='message-header'>{quote.author}</div>
            <div className='message-body is-size-4'>{quote.content}</div>
          </article>
        ))}
      </ContentBox>
    </PageLayout>
  )
}

export const getQuoteListPageStaticProps: GetStaticProps = async () => {
  return {
    props: {
      quotes: arrayShuffle(quoteData),
    },
  }
}
