import { Quote } from '@/quote/quote-model'
import quotes from '@/quote/quotes.json'

export const quoteDescription = 'Great quotes that will make you think twice about wagering.'

export const getQuotesInOrder = (): Quote[] => {
  return [...quotes].reverse()
}

export const quotesPerPage = 10

export const getTotalQuotePages = () => {
  return Math.ceil(quotes.length / quotesPerPage)
}
