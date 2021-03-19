import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

export interface TwitterLinkButtonProps {
  readonly linkPath: string
}

export const TwitterLinkButton: FunctionComponent<TwitterLinkButtonProps> = ({ linkPath }) => {
  const handleClick = () => {
    window.open(`https://twitter.com/intent/tweet?text=${window.location.origin}${linkPath}`, '_blank')
  }
  return (
    <button onClick={handleClick} title='Share via Twitter' className='button is-ghost has-text-grey'>
      <span className='icon is-large'>
        <FontAwesomeIcon icon={faTwitter} size='2x' />
      </span>
    </button>
  )
}
