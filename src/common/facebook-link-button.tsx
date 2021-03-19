import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

export interface FacebookLinkButtonProps {
  readonly linkPath: string
}

export const FacebookLinkButton: FunctionComponent<FacebookLinkButtonProps> = ({ linkPath }) => {
  const handleClick = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${linkPath}`, '_blank')
  }
  return (
    <button onClick={handleClick} title='Share via Facebook' className='button is-ghost has-text-grey'>
      <span className='icon is-large'>
        <FontAwesomeIcon icon={faFacebook} size='2x' />
      </span>
    </button>
  )
}
