import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ellipsize from 'ellipsize'
import { FunctionComponent, MouseEvent } from 'react'

import { alertToast } from '@/common/alert-toast'
import { uiConstants } from '@/common/ui-constants'

const getFullUrl = (linkPath: string): string => `${uiConstants.webUrl}${linkPath}`

export interface LinkShareProps {
  readonly summary?: string
  readonly linkPath: string
}

const LinkShareCopyButton: FunctionComponent<LinkShareProps> = ({ linkPath }) => {
  const handleClick = (event: MouseEvent) => {
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return
    }

    navigator.clipboard.writeText(getFullUrl(linkPath))

    alertToast({ content: 'Link copied', type: 'is-info' })

    event.preventDefault()
  }

  return (
    <a href={linkPath} onClick={handleClick} title='Copy Link' className='button is-ghost has-text-grey'>
      <span className='icon is-medium'>
        <FontAwesomeIcon icon={faLink} size='lg' />
      </span>
    </a>
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
