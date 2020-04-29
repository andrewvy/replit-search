import { useState, useEffect } from 'react'

import { SearchConsumer } from '../../contexts/search'

import styles from './index.module.css'

const Component = ({ performSearch }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleChanged = useEffect(() => {
    performSearch(`${title} ${body}`)
  }, [title, body])

  return (
    <div className={`question-form ${styles.container}`}>
      <fieldset className={styles.fieldset}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          onChange={(ev) => {
            setTitle(ev.target.value)
          }}
        ></input>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <label htmlFor='body'>Body</label>
        <textarea
          id='body'
          rows='10'
          onChange={(ev) => {
            setBody(ev.target.value)
          }}
        ></textarea>
      </fieldset>

      <button type='submit'>Ask</button>
    </div>
  )
}

const Wrapper = (props) => (
  <SearchConsumer>
    {({ performSearch }) => (
      <Component {...props} performSearch={performSearch} />
    )}
  </SearchConsumer>
)

export default Wrapper
