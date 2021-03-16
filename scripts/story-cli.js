const fs = require('fs')
const path = require('path')
const { customAlphabet } = require('nanoid')

const storyListPath = path.join(__dirname, '../src/resources/stories.json')
const getStoryId = customAlphabet('1234567890', 10)

const checkStories = () => {
  const stories = require(storyListPath)
  stories.forEach((story) => {
    if (!story.id || !story.url || !story.title || !story.summary || !story.imageUrl) {
      throw new Error('Invalid story')
    }
  })
  return stories
}

const addStory = () => {
  const stories = checkStories()
  const existingStoryIds = stories.map(({ id }) => id)

  let storyId = getStoryId()
  while (existingStoryIds.includes(storyId)) {
    storyId = getStoryId()
  }

  stories.push({
    id: storyId,
    url: 'URL',
    title: 'TITLE',
    summary: 'SUMMARY',
    imageUrl: 'IMAGE_URL',
  })

  fs.writeFileSync(storyListPath, `${JSON.stringify(stories, undefined, 2)}\n`)
}

const storyCli = (argv) => {
  if (argv[0] === 'check') {
    checkStories()
    return
  }
  if (argv[0] === 'add') {
    addStory()
    return
  }
}

if (require.main === module) {
  storyCli(process.argv.slice(2))
}
