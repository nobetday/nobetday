import { FunctionComponent } from 'react'

import { ButtonLink } from '@/common/button-link'

export interface PaginationProps {
  readonly previousPath?: string
  readonly nextPath?: string
}

export const Pagination: FunctionComponent<PaginationProps> = ({ previousPath, nextPath }) => {
  return (
    <section className='section'>
      <nav className='buttons is-right' role='navigation' aria-label='pagination'>
        {previousPath && (
          <ButtonLink href={previousPath} isBlurOnClick className='is-outlined is-primary'>
            Previous
          </ButtonLink>
        )}
        {nextPath && (
          <ButtonLink href={nextPath} isBlurOnClick className='is-outlined is-primary'>
            Next
          </ButtonLink>
        )}
      </nav>
    </section>
  )
}
