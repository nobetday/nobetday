import clsx from 'clsx'
import { FunctionComponent, useState } from 'react'

export const PageModal: FunctionComponent = ({ children }) => {
  const [active, setActive] = useState(true)
  const handleClose = () => setActive(false)

  return (
    <div className={clsx('modal', active && 'is-active')}>
      <div className='modal-background' onClick={handleClose}></div>
      <div className='modal-content'>{children}</div>
      <button className='modal-close is-large' onClick={handleClose} aria-label='close'></button>
    </div>
  )
}
