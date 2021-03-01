import clsx from 'clsx'
import { FunctionComponent } from 'react'

import { Story } from '@/resources/story-data'

export interface StoryDisplayProps {
  readonly story: Story
  readonly isFeatured?: boolean
}

export const StoryDisplay: FunctionComponent<StoryDisplayProps> = ({ story, isFeatured = false }) => {
  return (
    <div className='card'>
      <div className='card-image'>
        <figure className='image is-16by9'>
          <img src={story.imageUrl} alt={story.title} />
        </figure>
      </div>
      <div className='card-content'>
        <h3 className={clsx('subtitle', isFeatured ? 'is-2' : 'is-3')}>{story.title}</h3>
        <p className={isFeatured ? 'is-size-4' : 'is-size-5'}>{story.summary}</p>
        <div className='has-text-right mt-4'>
          <a href={story.url} className={clsx('button', isFeatured ? 'is-info is-medium' : 'is-dark')}>
            READ MORE
          </a>
        </div>
      </div>
    </div>
  )
}
