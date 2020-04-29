import { SearchConsumer } from '../../contexts/search'
import Question from './question'

import styles from './index.module.css'

const Component = ({ searchResults, isSearching }) => {
  const children = searchResults.map((searchResult) => (
    <Question key={searchResult.id} post={searchResult} />
  ))

  const shouldShow = !isSearching && searchResults.length > 0

  return (
    <div className={`${styles.container} ${shouldShow ? styles.visible : ''}`}>
      <div>Similar questions</div>
      <ol className={styles.questionList}>
        <li>{children}</li>
      </ol>
    </div>
  )
}

const Wrapper = (props) => (
  <SearchConsumer>
    {({ searchResults, isSearching }) => (
      <Component
        searchResults={searchResults}
        isSearching={isSearching}
        {...props}
      />
    )}
  </SearchConsumer>
)

export default Wrapper
