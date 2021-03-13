import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

import { Quote } from '@/resources/quote-data'

export interface QuoteDisplayProps {
  readonly quote: Quote
  readonly isFeatured?: boolean
}

export const QuoteDisplay: FunctionComponent<QuoteDisplayProps> = ({ quote, isFeatured = false }) => {
  const handleCopyToClipboard = () =>
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?id=${quote.id}`)
  return (
    <article className={clsx('message', isFeatured ? 'is-info is-large' : 'is-dark is-medium')}>
      <div className='message-header'>
        <p>{quote.author}</p>
        <a onClick={handleCopyToClipboard} className='icon is-small'>
          <FontAwesomeIcon icon={faCopy} />
        </a>
      </div>
      <div className='message-body is-size-4'>{quote.content}</div>
    </article>
  )
}
