import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { PageModal } from '@/common/page-modal'
import { Pagination } from '@/common/pagination'
import { getQueryValue } from '@/common/query'
import { getStoriesInOrder, getTotalStoryPages, storiesPerPage, storyDescription } from '@/story/story-data'
import { StoryDisplay } from '@/story/story-display'
import { Story } from '@/story/story-model'

const stories = getStoriesInOrder()
const totalStoryPages = getTotalStoryPages()

export interface StoryListPageProps {
  readonly pageId: number
}

export const StoryListPage: NextPage<StoryListPageProps> = ({ pageId }) => {
  const router = useRouter()
  const [selectedStory, setSelectedStory] = useState<Story>()
  const storiesOfPage = stories.slice((pageId - 1) * storiesPerPage, pageId * storiesPerPage)

  const handleSelectedStoryClose = () => {
    router.push('/stories')
  }

  useEffect(() => {
    const selectedStoryId = getQueryValue(router.query.id)
    setSelectedStory(stories.find((story) => story.id === selectedStoryId))
  }, [router.query.id])

  return (
    <PageLayout title='Stories' subtitle={storyDescription}>
      <NextSeo
        description={storyDescription}
        canonical='https://nobetday.com/stories'
        openGraph={{
          url: 'https://nobetday.com/stories',
          title: 'Stories',
          description: `${storyDescription}`,
        }}
      />
      <ContentBox>
        {selectedStory && (
          <PageModal onClose={handleSelectedStoryClose}>
            <section className='section'>
              <StoryDisplay story={selectedStory} />
            </section>
          </PageModal>
        )}
        {storiesOfPage.map((story) => (
          <section key={story.id} className='section'>
            <StoryDisplay story={story} />
          </section>
        ))}
        <Pagination
          previousPath={pageId > 1 ? (pageId === 2 ? '/stories' : `/stories/p/${pageId - 1}`) : undefined}
          nextPath={pageId < totalStoryPages ? `/stories/p/${pageId + 1}` : undefined}
        />
      </ContentBox>
    </PageLayout>
  )
}
