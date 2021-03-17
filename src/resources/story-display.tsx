import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

import { Story } from '@/resources/story-data'

export interface StoryDisplayProps {
  readonly story: Story
}

export const StoryDisplay: FunctionComponent<StoryDisplayProps> = ({ story }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/stories?id=${story.id}`)
  }

  return (
    <div className='block is-large'>
      <figure className='image is-2by1 mb-5'>
        <a href={story.url}>
          <img src={story.imageUrl} alt={story.title} />
        </a>
      </figure>
      <h2 className='subtitle is-2'>
        <a href={story.url} className='has-text-dark'>
          {story.title}
        </a>
      </h2>
      <p className='is-size-4'>
        <span>{story.summary}</span>
        <a href={story.url} className='icon is-small ml-3'>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      </p>
      <div className='mt-3'>
        <button onClick={handleCopy} className='button is-ghost has-text-grey'>
          <span className='icon is-large'>
            <FontAwesomeIcon icon={faCopy} size='2x' />
          </span>
        </button>
      </div>
    </div>
  )
}
