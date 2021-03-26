import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { PageModal } from '@/common/page-modal'
import { getQueryValue } from '@/common/query'
import { getStoriesInOrder, storyDescription } from '@/story/story-data'
import { StoryDisplay } from '@/story/story-display'
import { Story } from '@/story/story-model'

const stories = getStoriesInOrder()

export const StoryListPage: NextPage = () => {
  const router = useRouter()
  const [selectedStory, setSelectedStory] = useState<Story>()

  const handleSelectedStoryClose = () => {
    router.push('/stories')
  }

  useEffect(() => {
    const selectedStoryId = getQueryValue(router.query.id)
    setSelectedStory(stories.find((story) => story.id === selectedStoryId))
  }, [router.query.id])

  return (
    <PageLayout title='Stories' subtitle={storyDescription}>
      <ContentBox>
        {selectedStory && (
          <PageModal onClose={handleSelectedStoryClose}>
            <section className='section'>
              <StoryDisplay story={selectedStory} />
            </section>
          </PageModal>
        )}
        {stories.map((story) => (
          <section key={story.id} className='section'>
            <StoryDisplay story={story} />
          </section>
        ))}
      </ContentBox>
    </PageLayout>
  )
}
