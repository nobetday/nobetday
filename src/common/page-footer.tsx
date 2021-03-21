import { faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

import { uiConstants } from '@/common/ui-constants'

const SocialLinks: FunctionComponent = () => {
  return (
    <div className='block'>
      <div className='field is-grouped is-grouped-centered'>
        <div className='control'>
          <a href='https://github.com/nobetday/nobetday' title='GitHub' className='icon is-large'>
            <FontAwesomeIcon icon={faGithubSquare} size='2x' />
          </a>
        </div>
        <div className='control'>
          <a href='https://twitter.com/nobetday' title='Twitter' className='icon is-large'>
            <FontAwesomeIcon icon={faTwitterSquare} size='2x' />
          </a>
        </div>
        <div className='control'>
          <a href='https://plausible.io/nobetday.com' title='Analytics' className='icon is-large'>
            <FontAwesomeIcon icon={faGlobe} size='2x' />
          </a>
        </div>
      </div>
    </div>
  )
}

export interface PageFooterProps {
  readonly className?: string
}

export const PageFooter: FunctionComponent<PageFooterProps> = ({ className }) => {
  return (
    <footer className={clsx('footer has-text-centered', className)}>
      <div className='block'>
        <strong className='is-size-5'>Make every day your {uiConstants.appName}.</strong>
      </div>
      <SocialLinks />
    </footer>
  )
}
