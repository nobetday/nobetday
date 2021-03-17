import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { PageModal } from '@/common/page-modal'
import { getQueryValue } from '@/common/query'
import { getStoriesInOrder, Story } from '@/resources/story-data'
import { StoryDisplay } from '@/resources/story-display'

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
    <PageLayout title='Stories'>
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
