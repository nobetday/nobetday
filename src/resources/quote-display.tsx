import { FunctionComponent } from 'react'

import { CopyLinkButton } from '@/common/copy-link-button'
import { Quote } from '@/resources/quote-data'

export interface QuoteDisplayProps {
  readonly quote: Quote
}

export const QuoteDisplay: FunctionComponent<QuoteDisplayProps> = ({ quote }) => {
  return (
    <div className='block is-large'>
      <h2 className='subtitle is-2 has-text-dark'>{quote.author}</h2>
      <p className='quote-content is-size-4 pl-4 py-4'>{quote.content}</p>
      <div className='mt-3'>
        <CopyLinkButton linkPath={`/quotes?id=${quote.id}`} />
      </div>
    </div>
  )
}
