import NextLink, { LinkProps } from 'next/link'
import { FunctionComponent } from 'react'

export interface TextLinkProps extends LinkProps {
  readonly className?: string
}

export const TextLink: FunctionComponent<TextLinkProps> = ({ className, children, ...otherProps }) => {
  // Disable eslint until https://github.com/vercel/next.js/issues/5533 is fixed

  return (
    <NextLink {...otherProps}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={className}>{children}</a>
    </NextLink>
  )
}
