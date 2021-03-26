import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { getTotalStoryPages } from '@/story/story-data'
import { StoryListPageProps } from '@/story/story-list-page'

export interface StoryListPageParams extends ParsedUrlQuery {
  readonly storyPageId: string
}

export const getStoryListPageStaticPaths: GetStaticPaths = async () => {
  const totalStoryPages = getTotalStoryPages()
  const paths = Array.from({ length: totalStoryPages }, (_, pageIndex) => ({
    params: { storyPageId: `${pageIndex + 1}` },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStoryListPageStaticProps: GetStaticProps<StoryListPageProps, StoryListPageParams> = async ({
  params,
}) => {
  const storyPageId = params && params.storyPageId

  if (!storyPageId) {
    return {
      notFound: true,
    }
  }

  return {
    props: { pageId: +storyPageId },
  }
}

export const getFirstStoryListPageStaticProps: GetStaticProps<StoryListPageProps> = async () => {
  return {
    props: { pageId: 1 },
  }
}
