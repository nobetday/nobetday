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
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/quotes?id=${quote.id}`)
  }
  return (
    <article className={clsx('message', isFeatured ? 'is-info is-large' : 'is-dark is-medium')}>
      <div className='message-header'>
        <p>{quote.author}</p>
      </div>
      <div className='message-body is-size-4'>
        <p>{quote.content}</p>
        <div className='level mt-4'>
          <div className='level-left'>
            <div className='level-item'>
              <button onClick={handleCopy} className='button'>
                <span className='icon is-small'>
                  <FontAwesomeIcon icon={faCopy} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
