import stories from '@/resources/stories.json'

export interface Story {
  readonly id: string
  readonly url: string
  readonly title: string
  readonly summary: string
  readonly photoUrl: string
}

export const getStories = (): Story[] => {
  return stories.map(({ id, url, title, summary, photoUrl }) => {
    if (!id || !url || !title || !summary || !photoUrl) {
      throw new Error('Invalid story')
    }

    return {
      id,
      url,
      title,
      summary,
      photoUrl,
    }
  })
}
