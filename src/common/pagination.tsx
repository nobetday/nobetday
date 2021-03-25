import { FunctionComponent } from 'react'

import { TextLink } from '@/common/text-link'

export interface PaginationProps {
  readonly previousPath?: string
  readonly nextPath?: string
}

export const Pagination: FunctionComponent<PaginationProps> = ({ previousPath, nextPath }) => {
  return (
    <nav className='pagination is-centered' role='navigation' aria-label='pagination'>
      {previousPath && (
        <TextLink href={previousPath} className='pagination-previous'>
          Previous
        </TextLink>
      )}
      {nextPath && (
        <TextLink href={nextPath} className='pagination-next'>
          Next
        </TextLink>
      )}
    </nav>
  )
}
