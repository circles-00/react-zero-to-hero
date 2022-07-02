import starFillVector from '../../../assets/img/star-fill.png'
import starNonFillVector from '../../../assets/img/star-nonfill.png'
import './style.css'
import { generateRangeArray } from '../../../utils/common'

const Lesson = () => {
  return (
    <div className='container-sm d-flex flex-column text-start lesson-container'>
      <h5>Lesson 1: Introduction to React</h5>
      <p className='common-font-size'>In this lesson you will learn about what is ReactJS, how does it work and where it
        comes from. Start the lesson to learn more, now!</p>
      <div className='d-flex flex-row justify-content-between'>
        <div className='difficulty-container d-flex flex-row'>
          <span className='common-font-size'>DIFFICULTY: </span>
          <img alt='star' className='single-star' src={starFillVector} />
          {generateRangeArray(4).map((val, idx) => (
            <img key={idx} alt='star' className='single-star' src={starNonFillVector} />
          ))}
        </div>
        <button className='justify-content-end'>LEARN MORE</button>
      </div>
    </div>
  )
}

export default Lesson
