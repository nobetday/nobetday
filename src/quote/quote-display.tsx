import { FunctionComponent } from 'react'

import { LinkShareBox } from '@/common/link-share-box'
import { Quote } from '@/quote/quote-model'

export interface QuoteDisplayProps {
  readonly quote: Quote
}

export const QuoteDisplay: FunctionComponent<QuoteDisplayProps> = ({ quote }) => {
  return (
    <>
      <div className='block'>
        <h2 className='subtitle is-2 has-text-dark'>{quote.author}</h2>
      </div>
      <div className='block quote-content pl-4 py-4'>
        <p className='is-size-4'>{quote.content}</p>
      </div>
      <LinkShareBox summary={`${quote.author}: "${quote.content}"`} linkPath={`/quotes?id=${quote.id}`} />
    </>
  )
}
