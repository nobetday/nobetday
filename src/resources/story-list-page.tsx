import { NextPage } from 'next'

import { ComingSoon } from '@/common/coming-soon'
import { PageLayout } from '@/common/page-layout'

export const StoryListPage: NextPage = () => {
  return (
    <PageLayout title='Stories'>
      <ComingSoon />
    </PageLayout>
  )
}
