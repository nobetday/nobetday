import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { uiConstants } from '@/common/ui-constants'

export const PageFooter: FunctionComponent = () => {
  return (
    <footer>
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
