import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { PageModal } from '@/common/page-modal'
import { getQueryValue } from '@/common/query'
import { getFeaturedStory, getOtherStories, getStories, getStoryById, Story } from '@/resources/story-data'
import { StoryDisplay } from '@/resources/story-display'

export interface StoryListPageProps {
  readonly featuredStory: Story
  readonly otherStories: Story[]
}

export const StoryListPage: NextPage<StoryListPageProps> = ({ featuredStory, otherStories }) => {
  const router = useRouter()
  const [selectedStory, setSelectedStory] = useState<Story>()
  useEffect(() => {
    const id = getQueryValue(router.query.id)
    if (id) {
      setSelectedStory(getStoryById(id))
    }
  }, [router])
  return (
    <PageLayout title='Stories'>
      <ContentBox>
        {selectedStory && (
          <PageModal>
            <StoryDisplay story={selectedStory} isFeatured={selectedStory.id === featuredStory.id} />
          </PageModal>
        )}
        <h2 className='subtitle is-2'>Featured Story</h2>
        <div className='columns is-centered'>
          <div className='column is-two-thirds'>
            <StoryDisplay story={featuredStory} isFeatured />
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

  return {
    props: {
      featuredStory: getFeaturedStory(stories),
      otherStories: getOtherStories(stories),
    },
  }
}
