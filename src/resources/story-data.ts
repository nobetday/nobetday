import stories from '@/resources/stories.json'

export interface Story {
  readonly id: string
  readonly url: string
  readonly title: string
  readonly summary: string
  readonly imageUrl: string
}

export const getStoriesInOrder = (): Story[] => {
  return [...stories].reverse()
}
