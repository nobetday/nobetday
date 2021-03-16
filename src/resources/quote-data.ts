import quotes from '@/resources/quotes.json'

export interface Quote {
  readonly id: string
  readonly content: string
  readonly author: string
}

export const getQuotesInOrder = (): Quote[] => {
  return [...quotes].reverse()
}
