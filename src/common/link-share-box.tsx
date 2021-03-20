import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ellipsize from 'ellipsize'
import { FunctionComponent } from 'react'

const getFullUrl = (linkPath: string): string => `${window.location.origin}${linkPath}`

export interface LinkShareProps {
  readonly summary?: string
  readonly linkPath: string
}

const LinkShareCopyButton: FunctionComponent<LinkShareProps> = ({ linkPath }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(getFullUrl(linkPath))

    const { toast } = require('bulma-toast')
    toast({
      message: 'Link copied',
      type: 'is-info',
      position: 'bottom-left',
      duration: 1000,
    })
  }

  return (
    <button onClick={handleClick} title='Copy Link' className='button is-ghost has-text-grey'>
      <span className='icon is-medium'>
        <FontAwesomeIcon icon={faLink} size='lg' />
      </span>
    </button>
  )
}

const LinkShareTwitterButton: FunctionComponent<LinkShareProps> = ({ summary, linkPath }) => {
  const handleClick = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${ellipsize(summary, 200)} ${getFullUrl(linkPath)}`,
      )}`,
    )
  }

  return (
    <button onClick={handleClick} title='Share to Twitter' className='button is-ghost has-text-grey'>
      <span className='icon is-medium'>
        <FontAwesomeIcon icon={faTwitter} size='lg' />
      </span>
    </button>
  )
}

const LinkShareFacebookButton: FunctionComponent<LinkShareProps> = ({ summary, linkPath }) => {
  const handleClick = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getFullUrl(linkPath))}`)
  }

  return (
    <button onClick={handleClick} title='Share to Facebook' className='button is-ghost has-text-grey'>
      <span className='icon is-medium'>
        <FontAwesomeIcon icon={faFacebook} size='lg' />
      </span>
    </button>
  )
}

export const LinkShareBox: FunctionComponent<LinkShareProps> = ({ summary, linkPath }) => {
  return (
    <div className='block'>
      <div className='field is-grouped'>
        <div className='control'>
          <LinkShareCopyButton linkPath={linkPath} />
        </div>
        <div className='control'>
          <LinkShareTwitterButton summary={summary} linkPath={linkPath} />
        </div>
        <div className='control'>
          <LinkShareFacebookButton summary={summary} linkPath={linkPath} />
        </div>
      </div>
    </div>
  )
}
