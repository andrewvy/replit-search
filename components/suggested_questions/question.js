import styles from './question.module.css'

const Component = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <a href='#'>{post.title}</a>
      </div>
      <div className={styles.voteCount}>{post.voteCount} Votes</div>
      <div className={styles.acceptedAnswer}>{post.accepted && '✔'}</div>
    </div>
  )
}

export default Component
