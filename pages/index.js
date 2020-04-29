import { SearchConsumer } from '../contexts/search'

import QuestionForm from '../components/question_form'
import SuggestedQuestions from '../components/suggested_questions'

const Page = () => {
  return (
    <div className="container">
      <QuestionForm />
      <SuggestedQuestions />
    </div>
  )
}

export default Page