import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextImage from 'next/image'
import { FunctionComponent } from 'react'

import { LinkShareBox } from '@/common/link-share-box'
import { Story } from '@/story/story-model'

export interface StoryDisplayProps {
  readonly story: Story
}

export const StoryDisplay: FunctionComponent<StoryDisplayProps> = ({ story }) => {
  return (
    <>
      <div className='block'>
        <figure className='image is-2by1'>
          <a href={story.url}>
            <NextImage src={story.imageUrl} alt={story.title} layout='fill' objectFit='cover' />
          </a>
        </figure>
      </div>
      <div className='block'>
        <h2 className='subtitle is-2'>
          <a href={story.url} className='has-text-dark'>
            {story.title}
          </a>
        </h2>
      </div>
      <div className='block'>
        <p className='is-size-4'>
          <span>{story.summary}</span>
          <a href={story.url} title='Read More' className='icon is-small has-text-primary ml-3'>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </p>
      </div>
      <LinkShareBox summary={`${story.title}: ${story.summary}`} linkPath={`/stories?id=${story.id}`} />
    </>
  )
}
