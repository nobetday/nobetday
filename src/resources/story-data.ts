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
