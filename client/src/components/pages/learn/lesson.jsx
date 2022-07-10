import starFillVector from '../../../assets/img/star-fill.png'
import starNonFillVector from '../../../assets/img/star-nonfill.png'
import './style.css'
import { generateRangeArray } from '../../../utils/common'

const Lesson = ({
  idx,
  title,
  shortDescription,
  difficulty,
  isDone,
  showSeparator,
}) => {
  const getIsDisabled = () => !isDone && idx !== 0 && !showSeparator
  return (
    <div className="container-sm d-flex flex-column text-start lesson-container">
      <h5>
        Lesson {idx + 1}: {title}
      </h5>
      <p className="common-font-size">{shortDescription}</p>
      <div className="d-flex flex-row justify-content-between">
        <div className="difficulty-container d-flex flex-row">
          <span className="common-font-size">DIFFICULTY: </span>
          {generateRangeArray(difficulty).map((val) => (
            <img
              key={val}
              alt="star"
              className="single-star"
              src={starFillVector}
            />
          ))}
          {generateRangeArray(5 - difficulty).map((val) => (
            <img
              key={val}
              alt="star"
              className="single-star"
              src={starNonFillVector}
            />
          ))}
        </div>
        <button
          disabled={getIsDisabled()}
          className={`justify-content-end ${getIsDisabled() ? 'disabled' : ''}`}
          style={{ color: '#7000B1' }}
        >
          {isDone ? 'READ AGAIN' : 'LEARN MORE'}
        </button>
      </div>
    </div>
  )
}

export default Lesson
