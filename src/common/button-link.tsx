import clsx from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import { FunctionComponent } from 'react'

export interface ButtonLinkProps extends LinkProps {
  readonly className?: string
  readonly isBlurOnClick?: boolean
  readonly title?: string
}

export const ButtonLink: FunctionComponent<ButtonLinkProps> = ({
  className,
  isBlurOnClick,
  title,
  children,
  ...otherProps
}) => {
  // Disable eslint until https://github.com/vercel/next.js/issues/5533 is fixed
  const handleClick = isBlurOnClick
    ? () => {
        const activeElement = document.activeElement as HTMLElement
        activeElement.blur()
      }
    : undefined

  return (
    <NextLink {...otherProps}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={clsx('button', className)} title={title} onClick={handleClick}>
        {children}
      </a>
    </NextLink>
  )
}
