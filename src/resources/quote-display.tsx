import { FunctionComponent } from 'react'

import { CopyLinkButton } from '@/common/copy-link-button'
import { FacebookLinkButton } from '@/common/facebook-link-button'
import { TwitterLinkButton } from '@/common/twitter-link-button'
import { Quote } from '@/resources/quote-data'

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
      <div className='block'>
        <CopyLinkButton linkPath={`/quotes?id=${quote.id}`} />
        <TwitterLinkButton linkPath={`/quotes?id=${quote.id}`} />
        <FacebookLinkButton linkPath={`/quotes?id=${quote.id}`} />
      </div>
    </>
  )
}
