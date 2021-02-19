import clsx from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import { FunctionComponent } from 'react'

export interface ButtonLinkProps extends LinkProps {
  readonly className?: string
}

export const ButtonLink: FunctionComponent<ButtonLinkProps> = ({ className, children, ...otherProps }) => {
  // Disable eslint until https://github.com/vercel/next.js/issues/5533 is fixed

  return (
    <NextLink {...otherProps}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={clsx('button', className)}>{children}</a>
    </NextLink>
  )
}
