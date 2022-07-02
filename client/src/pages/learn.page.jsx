import Title from '../components/pages/learn/title'
import Lesson from '../components/pages/learn/lesson'
import { generateRangeArray } from '../utils/common'

const LearnPage = () => {
  return (
    <section className='container-lg d-flex justify-content-center flex-column text-center'>
      <Title />
      {generateRangeArray(5).map((val, idx) => (
        <Lesson key={idx} />
        ))}
    </section>
  )
}

export default LearnPage
