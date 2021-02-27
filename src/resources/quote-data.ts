import quotes from '@/resources/quotes.json'

export interface Quote {
  readonly id: string
  readonly content: string
  readonly author: string
}

export const getQuotes = (): Quote[] => {
  return quotes.map(({ id, content, author }) => {
    if (!id || !content || !author) {
      throw new Error('Invalid quote')
    }

    return {
      id,
      content,
      author,
    }
  })
}
