import clsx from 'clsx'
import { randomInt, randomLcg } from 'd3-random'
import { GetStaticProps, NextPage } from 'next'
import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { getStories, Story } from '@/resources/story-data'

interface StoryDisplayProps {
  readonly story: Story
  readonly isFeatured?: boolean
}

const StoryDisplay: FunctionComponent<StoryDisplayProps> = ({ story, isFeatured = false }) => {
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

export interface StoryListPageProps {
  readonly storyOfTheDay: Story
  readonly otherStories: Story[]
}

export const StoryListPage: NextPage<StoryListPageProps> = ({ storyOfTheDay, otherStories }) => {
  return (
    <PageLayout title='Stories'>
      <ContentBox>
        <h2 className='subtitle is-2'>Story of the Day</h2>
        <div className='columns is-centered'>
          <div className='column is-two-thirds'>
            <StoryDisplay story={storyOfTheDay} isFeatured />
          </div>
        </div>
        <h2 className='subtitle is-2'>Other Stories</h2>
        <div className='columns is-multiline'>
          {otherStories.map((story) => (
            <div key={story.id} className='column is-half'>
              <StoryDisplay story={story} />
            </div>
          ))}
        </div>
      </ContentBox>
    </PageLayout>
  )
}

export const getStoryListPageStaticProps: GetStaticProps = async () => {
  const stories = getStories()
  const storyOfTheDayIndex = randomInt.source(randomLcg(stories.length))(0, stories.length)()
  const otherStories = [...stories]
  otherStories.splice(storyOfTheDayIndex, 1)

  return {
    props: {
      storyOfTheDay: stories[storyOfTheDayIndex],
      otherStories: otherStories.reverse(),
    },
  }
}
