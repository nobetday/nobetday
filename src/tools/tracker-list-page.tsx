import { NextPage } from 'next'

import { ComingSoon } from '@/common/coming-soon'
import { PageLayout } from '@/common/page-layout'

export const TrackerListPage: NextPage = () => {
  return (
    <PageLayout title='Trackers'>
      <ComingSoon />
    </PageLayout>
  )
}
