import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

import { uiConstants } from './ui-constants'

export interface PageFooterProps {
  readonly className?: string
}

export const PageFooter: FunctionComponent<PageFooterProps> = ({ className }) => {
  return (
    <footer className={clsx('footer has-text-centered', className)}>
      <div className='block'>
        <strong className='is-size-5'>Make every day your {uiConstants.appName}.</strong>
      </div>
      <div className='block'>
        <a href='https://github.com/nobetday/nobetday' className='icon is-large'>
          <FontAwesomeIcon icon={faGithub} size='2x' />
        </a>
        <a href='https://twitter.com/nobetday' className='icon is-large'>
          <FontAwesomeIcon icon={faTwitter} size='2x' />
        </a>
      </div>
    </footer>
  )
}
