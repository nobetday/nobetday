import { uiConstants } from '@/common/ui-constants'
import stories from '@/story/stories.json'
import { Story } from '@/story/story-model'

export const storyDescription = 'Real life stories from people who experience gambling harm.'

export const getStoriesInOrder = (): Story[] => {
  return [...stories].reverse()
}

export const getTotalStoryPages = () => {
  return Math.ceil(stories.length / uiConstants.itemsPerPage)
}
