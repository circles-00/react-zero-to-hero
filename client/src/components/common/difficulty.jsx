import starFillVector from '../../assets/img/star-fill.png'
import starNonFillVector from '../../assets/img/star-nonfill.png'
import { generateRangeArray } from '../../utils/common'

const Difficulty = ({ difficulty, style }) => {
  return (
    <div className={`difficulty-container d-flex flex-row`} style={style}>
      <span className="common-font-size">DIFFICULTY: </span>
      {generateRangeArray(Math.ceil(difficulty)).map((val) => (
        <img
          key={val}
          alt="star"
          className="single-star"
          src={starFillVector}
        />
      ))}
      {generateRangeArray(Math.ceil(5 - difficulty)).map((val) => (
        <img
          key={val}
          alt="star"
          className="single-star"
          src={starNonFillVector}
        />
      ))}
    </div>
  )
}

export default Difficulty
