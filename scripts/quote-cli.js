const fs = require('fs')
const path = require('path')
const { customAlphabet } = require('nanoid')

const quoteListPath = path.join(__dirname, '../src/resources/quotes.json')
const getQuoteId = customAlphabet('1234567890', 10)

const addQuote = () => {
  const quotes = require(quoteListPath)
  const existingQuoteIds = quotes.map(({ id }) => id)

  let quoteId = getQuoteId()
  while (existingQuoteIds.includes(quoteId)) {
    quoteId = getQuoteId()
  }

  quotes.push({
    id: quoteId,
    content: 'CONTENT',
    author: 'AUTHOR',
  })

  fs.writeFileSync(quoteListPath, `${JSON.stringify(quotes, undefined, 2)}\n`)
}

const quoteCli = (argv) => {
  if (argv[0] === 'add') {
    addQuote()
    return
  }
}

if (require.main === module) {
  quoteCli(process.argv.slice(2))
}
