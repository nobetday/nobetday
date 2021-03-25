import { uiConstants } from '@/common/ui-constants'
import quotes from '@/resources/quotes.json'

export interface Quote {
  readonly id: string
  readonly content: string
  readonly author: string
}

export const quoteDescription = 'Great quotes that will make you think twice about wagering.'

export const getQuotesInOrder = (): Quote[] => {
  return [...quotes].reverse()
}

export const getTotalQuotePages = () => {
  return Math.ceil(quotes.length / uiConstants.itemsPerPage)
}
