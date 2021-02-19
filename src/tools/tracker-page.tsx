import { NextPage } from 'next'

import { ComingSoon } from '@/common/coming-soon'
import { PageLayout } from '@/common/page-layout'

export const TrackerPage: NextPage = () => {
  return (
    <PageLayout title='Tracker'>
      <ComingSoon />
    </PageLayout>
  )
}
