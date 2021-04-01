import { ensureEnv } from '@/common/env'

export const uiConstants = {
  appName: 'NO BET DAY',
  webUrl: ensureEnv('NEXT_PUBLIC_WEB_URL', process.env.NEXT_PUBLIC_WEB_URL),
}
