import { NextPage } from 'next'

import { ComingSoon } from '@/common/coming-soon'
import { PageLayout } from '@/common/page-layout'

export const CalculatorListPage: NextPage = () => {
  return (
    <PageLayout title='Calculators'>
      <ComingSoon />
    </PageLayout>
  )
}
