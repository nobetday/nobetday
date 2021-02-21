import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'

import { ButtonLink } from '@/common/button-link'
import { TextLink, TextLinkProps } from '@/common/text-link'
import { uiConstants } from '@/common/ui-constants'

const navbarColor = 'is-primary'

interface NavbarBurgerProps {
  readonly isMenuActive: boolean
  readonly setMenuActive: (value: boolean) => void
}

const NavbarBurger: FunctionComponent<NavbarBurgerProps> = ({ isMenuActive, setMenuActive }) => {
  return (
    <button
      className={clsx('navbar-burger button is-outlined my-1', navbarColor, isMenuActive && 'is-active')}
      onClick={() => setMenuActive(!isMenuActive)}
      aria-label='menu'
      aria-expanded={isMenuActive}
    >
      <span aria-hidden='true' />
      <span aria-hidden='true' />
      <span aria-hidden='true' />
    </button>
  )
}

interface NavbarTextLinkProps extends TextLinkProps {
  readonly href: string
  readonly currentPath: string
}

const NavbarTextLink: FunctionComponent<NavbarTextLinkProps> = ({ href, currentPath, className, ...otherProps }) => {
  const isActive = currentPath.startsWith(href)

  return (
    <TextLink
      href={href}
      className={clsx('navbar-item is-size-5 px-5', isActive && 'is-active', className)}
      {...otherProps}
    />
  )
}

const NavbarStart: FunctionComponent = () => {
  const currentPath = useRouter().pathname

  return (
    <div className='navbar-start'>
      <NavbarTextLink href='/stories' currentPath={currentPath}>
        Stories
      </NavbarTextLink>
      <NavbarTextLink href='/quotes' currentPath={currentPath}>
        Quotes
      </NavbarTextLink>
      <NavbarTextLink href='/trackers' currentPath={currentPath}>
        Trackers
      </NavbarTextLink>
      <NavbarTextLink href='/calculators' currentPath={currentPath}>
        Calculators
      </NavbarTextLink>
    </div>
  )
}

const NavbarEnd: FunctionComponent = () => {
  return (
    <div className='navbar-end mx-3'>
      <div className='navbar-item py-0'>
        <ButtonLink href='/signin' className='is-dark'>
          SIGN IN
        </ButtonLink>
      </div>
    </div>
  )
}

export const Navbar: FunctionComponent = () => {
  const [isMenuActive, setMenuActive] = useState(false)

  return (
    <nav className={clsx('navbar is-fixed-top', navbarColor)} role='navigation' aria-label='main navigation'>
      <div className='container'>
        <div className='navbar-brand'>
          <TextLink href='/' className='navbar-item mr-5'>
            <strong className='is-size-4'>{uiConstants.appName}</strong>
          </TextLink>
          <NavbarBurger isMenuActive={isMenuActive} setMenuActive={setMenuActive} />
        </div>
        <div className={clsx('navbar-menu', isMenuActive && 'is-active')}>
          <NavbarStart />
          <NavbarEnd />
        </div>
      </div>
    </nav>
  )
}
