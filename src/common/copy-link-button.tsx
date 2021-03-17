import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

export interface CopyLinkButtonProps {
  readonly linkPath: string
}

export const CopyLinkButton: FunctionComponent<CopyLinkButtonProps> = ({ linkPath }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}${linkPath}`)

    const { toast } = require('bulma-toast')
    toast({
      message: 'Link copied',
      type: 'is-info',
      position: 'bottom-left',
      duration: 1000,
    })
  }

  return (
    <button onClick={handleClick} title='Copy link' className='button is-ghost has-text-grey'>
      <span className='icon is-large'>
        <FontAwesomeIcon icon={faCopy} size='2x' />
      </span>
    </button>
  )
}
