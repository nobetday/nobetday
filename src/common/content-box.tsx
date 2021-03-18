import clsx from 'clsx'
import { FunctionComponent } from 'react'

export interface ContentBoxProps {
  readonly className?: string
}

export const ContentBox: FunctionComponent<ContentBoxProps> = ({ className, children }) => {
  return <div className={clsx('container is-max-desktop', className)}>{children}</div>
}
