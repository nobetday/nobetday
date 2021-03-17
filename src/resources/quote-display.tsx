import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

import { Quote } from '@/resources/quote-data'

export interface QuoteDisplayProps {
  readonly quote: Quote
}

export const QuoteDisplay: FunctionComponent<QuoteDisplayProps> = ({ quote }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/quotes?id=${quote.id}`)
  }

  return (
    <div className='block is-large'>
      <h2 className='subtitle is-2 has-text-dark'>{quote.author}</h2>
      <p className='quote-content is-size-4 pl-4 py-4'>{quote.content}</p>
      <div className='mt-3'>
        <button onClick={handleCopy} className='button is-ghost has-text-grey'>
          <span className='icon is-large'>
            <FontAwesomeIcon icon={faCopy} size='2x' />
          </span>
        </button>
      </div>
    </div>
  )
}
