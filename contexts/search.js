// This is the context for search, it holds the data related to search and functions for searching.

import React from 'react'
import { debounce } from 'debounce'

import { tokenize, indexDocument, scoreDocument } from '../lib/search'
import SearchQuestionsQuery from '../queries/search_questions'

const SearchContext = React.createContext()

class SearchProvider extends React.Component {
  constructor(props) {
    super(props)

    this.debouncedActuallyPerformSearch = debounce(
      this.actuallyPerformSearch,
      200
    )

    this.state = {
      currentSearchRequest: null,
      searchResults: [],
      isSearching: false,
    }
  }

  // Sort Criteria (in-order)
  // - Sort documents by best matching score to search query
  // - Sort documents by accepted answer
  // - Sort documents by vote count
  saveAndSortSearchResults = (searchText, data) => {
    const documents = data || []
    let indexedDocuments = documents.map(indexDocument)
    const parsedSearchQuery = tokenize(searchText)

    indexedDocuments = indexedDocuments
      .filter((document) => scoreDocument(document, parsedSearchQuery) > 0)
      .sort((docA, docB) => {
        const scoreA = scoreDocument(docA, parsedSearchQuery)
        const scoreB = scoreDocument(docB, parsedSearchQuery)

        // If docA scores LESS than docB, we want to order docB first.
        if (scoreA < scoreB) {
          return 1
          // If docA scores MORE than docB, we want to order docA first.
        } else if (scoreA > scoreB) {
          return -1
        } else {
          // If docA and docB scores are identical, we'll sort by the question who has an accepted answer.
          if (!docA.accepted && docB.accepted) {
            return 1
          } else if (docA.accepted && !docB.accepted) {
            return -1
          } else {
            // If docA and docB scores are identical && both are accepted, we'll sort by their vote count.
            if (docA.voteCount < docB.voteCount) {
              return 1
              // If docA scores MORE than docB, we want to order docA first.
            } else if (docA.voteCount > docB.voteCount) {
              return -1
            }
          }
        }

        return 0
      })

    this.setState({
      cachedResults: documents,
      searchResults: indexedDocuments,
    })
  }

  actuallyPerformSearch = (searchText) => {
    const { currentSearchRequest, cachedResults } = this.state
    const trimmedSearchText = searchText.trim()
    if (trimmedSearchText.length == 0) return

    if (currentSearchRequest) {
      currentSearchRequest.abort()
    }

    const abortController = new AbortController()

    this.setState({
      isSearching: true,
      currentSearchRequest: abortController,
    })

    SearchQuestionsQuery(trimmedSearchText, abortController)
      .then((data) => {
        this.saveAndSortSearchResults(trimmedSearchText, data['posts'])
      })
      .catch(() => {
        this.saveAndSortSearchResults(trimmedSearchText, cachedResults)
      })
      .finally(() => {
        this.setState({
          isSearching: false,
          currentSearchRequest: null,
        })
      })
  }

  performSearch = (text) => {
    this.debouncedActuallyPerformSearch(text)
  }

  render() {
    const { isSearching, searchResults } = this.state

    const value = {
      isSearching,
      searchResults,
      performSearch: this.performSearch,
    }

    return (
      <SearchContext.Provider value={value}>
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}

const SearchConsumer = SearchContext.Consumer

export { SearchProvider, SearchConsumer }
