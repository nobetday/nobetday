import { NextPage } from 'next'

import { ComingSoon } from '@/common/coming-soon'
import { PageLayout } from '@/common/page-layout'

export const QuoteListPage: NextPage = () => {
  return (
    <PageLayout title='Quotes'>
      <ComingSoon />
    </PageLayout>
  )
}
