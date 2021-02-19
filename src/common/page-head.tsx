import NextHead from 'next/head'
import { FunctionComponent } from 'react'

import { uiConstants } from '@/common/ui-constants'

export interface PageHeadProps {
  readonly title: string
}

export const PageHead: FunctionComponent<PageHeadProps> = ({ title }) => {
  return (
    <NextHead>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>
        {title} - {uiConstants.appName}
      </title>
    </NextHead>
  )
}
