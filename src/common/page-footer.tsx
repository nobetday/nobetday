import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { uiConstants } from '@/common/ui-constants'

export interface PageFooterProps {
  readonly className?: string
}

export const PageFooter: FunctionComponent<PageFooterProps> = ({ className }) => {
  return (
    <footer className={clsx('has-background-info-light', className)}>
      <ContentBox>
        <div className='block'>
          <strong className='is-size-4 ml-1'>{uiConstants.appName}</strong>
        </div>
        <div className='block'>
          <a href='https://github.com/nobetday/nobetday' className='icon is-large'>
            <FontAwesomeIcon icon={faGithub} size='2x' />
          </a>
          <a href='https://twitter.com/nobetday' className='icon is-large'>
            <FontAwesomeIcon icon={faTwitter} size='2x' />
          </a>
        </div>
      </ContentBox>
    </footer>
  )
}
