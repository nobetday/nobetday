import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'

export const ComingSoon: FunctionComponent = () => {
  return (
    <ContentBox>
      <div className='notification is-info'>
        <p className='is-size-5'>COMING SOON</p>
      </div>
    </ContentBox>
  )
}
