import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { uiConstants } from '@/common/ui-constants'

export const PageFooter: FunctionComponent = () => {
  return (
    <footer>
      <ContentBox>
        <strong className='is-size-4 ml-1'>{uiConstants.appName}</strong>
      </ContentBox>
    </footer>
  )
}
