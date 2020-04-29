// Given a string and numberOfCharacters, splits it into array n-characters.
// "abcdefg", 2 => ['ab', 'cd', 'ef', 'g']
const splitByCharacters = (text, numberOfCharacters) => {
  return text.split('').reduce((acc, character, idx) => {
    return [...acc, text.substr(idx, numberOfCharacters)]
  }, [])
}

// Tokenizes a document by splitting it into n-grams (default 3).
const tokenize = (text) =>
  splitByCharacters(text, 3).map((token) => token.toLowerCase())

// Parses a document into a list of tokens, adds as `document.index`.
const indexDocument = (document) => {
  return {
    ...document,
    index: tokenize(`${document.title} ${document.body}`),
  }
}

/*
 * Takes an indexed document, and a list of search tokens, and returns a 'score'.
 * A higher rated score means that the document closely matches what we're searching.
 */

const scoreDocument = (document, searchTokens) => {
  // A simple search which just scores how many tokens match in a given document.
  // @TODO(vy): We should weight tokens if there are more of the same token within the document, instead of a binary 1 / 0 if there's a match.
  const score = searchTokens.reduce((acc, token) => {
    const tokenExistsInDocument = document.index.includes(token)

    if (tokenExistsInDocument) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)

  return score
}

export { tokenize, indexDocument, scoreDocument }
