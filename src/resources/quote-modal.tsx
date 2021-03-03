import clsx from 'clsx'
import { FunctionComponent, useState } from 'react'

import { Quote } from '@/resources/quote-data'
import { QuoteDisplay } from '@/resources/quote-display'

export interface QuoteModalProps {
  readonly quote: Quote
}

export const QuoteModal: FunctionComponent<QuoteModalProps> = ({ quote }) => {
  const [active, setActive] = useState(true)

  return (
    <div className={clsx('modal', active && 'is-active')}>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <QuoteDisplay quote={quote} isFeatured />
      </div>
      <button className='modal-close is-large' onClick={() => setActive(false)} aria-label='close'></button>
    </div>
  )
}
