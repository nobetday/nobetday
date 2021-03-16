import clsx from 'clsx'
import { FunctionComponent, useState } from 'react'

export interface PageModalProps {
  readonly onClose?: () => void
}

export const PageModal: FunctionComponent<PageModalProps> = ({ children, onClose }) => {
  const [active, setActive] = useState(true)
  const handleClose = () => {
    setActive(false)
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className={clsx('modal', active && 'is-active')}>
      <div className='modal-background' onClick={handleClose}></div>
      <div className='modal-content has-background-body p-3'>{children}</div>
      <button className='modal-close is-large' onClick={handleClose} aria-label='close'></button>
    </div>
  )
}
