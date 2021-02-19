import clsx from 'clsx'
import { FunctionComponent, useState } from 'react'

import { TextLink } from '@/common/text-link'
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

const NavbarStart: FunctionComponent = () => {
  return <div className='navbar-start'></div>
}

const NavbarEnd: FunctionComponent = () => {
  return (
    <div className='navbar-end mx-3 py-1'>
      <div className='navbar-item'></div>
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
            <strong>{uiConstants.appName}</strong>
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
