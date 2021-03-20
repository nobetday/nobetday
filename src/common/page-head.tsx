import NextHead from 'next/head'
import { FunctionComponent } from 'react'

import { uiConstants } from '@/common/ui-constants'

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export interface PageHeadProps {
  readonly title: string
}

export const PageHead: FunctionComponent<PageHeadProps> = ({ title }) => {
  return (
    <NextHead>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {!!plausibleDomain && (
        <script async defer data-domain={plausibleDomain} src='https://plausible.io/js/plausible.js'></script>
      )}
      <title>
        {title} - {uiConstants.appName}
      </title>
    </NextHead>
  )
}
