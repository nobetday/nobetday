import { randomInt, randomLcg } from 'd3-random'

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

export const getFeaturedQuote = (quotes: Quote[]): Quote => {
  const featuredQuoteIndex = randomInt.source(randomLcg(quotes.length))(0, quotes.length)()
  return quotes[featuredQuoteIndex]
}

export const getOtherQuotes = (quotes: Quote[]): Quote[] => {
  const featuredQuote = getFeaturedQuote(quotes)
  return quotes.filter((quote) => quote.id !== featuredQuote.id).reverse()
}
