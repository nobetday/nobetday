import { NextPage } from 'next'

import { ComingSoon } from '@/common/coming-soon'
import { PageLayout } from '@/common/page-layout'

export const CalculatorPage: NextPage = () => {
  return (
    <PageLayout title='Calculator'>
      <ComingSoon />
    </PageLayout>
  )
}
