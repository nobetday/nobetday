import { randomInt, randomLcg } from 'd3-random'

import stories from '@/resources/stories.json'

export interface Story {
  readonly id: string
  readonly url: string
  readonly title: string
  readonly summary: string
  readonly imageUrl: string
}

export const getStories = (): Story[] => {
  return stories.map(({ id, url, title, summary, imageUrl }) => {
    if (!id || !url || !title || !summary || !imageUrl) {
      throw new Error('Invalid story')
    }

    return {
      id,
      url,
      title,
      summary,
      imageUrl,
    }
  })
}

export const getFeaturedStory = (stories: Story[]): Story => {
  const featuredStoryIndex = randomInt.source(randomLcg(stories.length))(0, stories.length)()
  return stories[featuredStoryIndex]
}

export const getOtherStories = (stories: Story[]): Story[] => {
  const featuredStory = getFeaturedStory(stories)
  return stories.filter((story) => story.id !== featuredStory.id).reverse()
}
