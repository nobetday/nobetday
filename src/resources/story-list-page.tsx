import clsx from 'clsx'
import { randomInt, randomLcg } from 'd3-random'
import { GetStaticProps, NextPage } from 'next'
import { FunctionComponent } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { stories, Story } from '@/resources/story-data'

export interface StoryListPageProps {
  readonly storyOfTheDay: Story
  readonly otherStories: Story[]
}

interface StoryDisplayProps {
  readonly story: Story
  readonly isSpecial?: boolean
}

const StoryDisplay: FunctionComponent<StoryDisplayProps> = ({ story, isSpecial = false }) => {
  return (
    <a href={story.url}>
      <div className='card mb-5'>
        <header className='card-header'>
          <p className={clsx('card-header-title notification is-size-4', isSpecial ? 'is-info' : 'is-dark')}>
            {story.title}
          </p>
        </header>
        <div className='card-content'>
          <div className='content is-size-4'>{story.description}</div>
        </div>
      </div>
    </a>
  )
}

export const StoryListPage: NextPage<StoryListPageProps> = ({ storyOfTheDay, otherStories }) => {
  return (
    <PageLayout title='Stories'>
      <ContentBox>
        <h2 className='subtitle is-2'>Story of the Day</h2>
        <StoryDisplay story={storyOfTheDay} isSpecial />
        <h2 className='subtitle is-2'>Other Stories</h2>
        {otherStories.map((story, index) => (
          <StoryDisplay key={index} story={story} />
        ))}
      </ContentBox>
    </PageLayout>
  )
}

export const getStoryListPageStaticProps: GetStaticProps = async () => {
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
