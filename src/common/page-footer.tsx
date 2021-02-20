import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { uiConstants } from '@/common/ui-constants'

export const PageFooter: FunctionComponent = () => {
  return (
    <footer className='has-background-light mt-6'>
      <ContentBox>
        <strong className='ml-1'>{uiConstants.appName}</strong>
      </ContentBox>
    </footer>
  )
}
