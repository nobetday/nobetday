import clsx from 'clsx'
import { FunctionComponent } from 'react'

import { Quote } from '@/resources/quote-data'

export interface QuoteDisplayProps {
  readonly quote: Quote
  readonly isFeatured?: boolean
}

export const QuoteDisplay: FunctionComponent<QuoteDisplayProps> = ({ quote, isFeatured = false }) => {
  return (
    <article className={clsx('message', isFeatured ? 'is-info is-large' : 'is-dark is-medium')}>
      <div className='message-header'>{quote.author}</div>
      <div className='message-body is-size-4'>{quote.content}</div>
    </article>
  )
}
