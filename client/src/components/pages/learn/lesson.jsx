import './style.css'
import { useHistory } from 'react-router'
import Difficulty from './difficulty'
import { singleLessonPage } from '../../../config/routes'

const Lesson = ({
  idx,
  title,
  shortDescription,
  difficulty,
  isDone,
  showSeparator,
}) => {
  const history = useHistory()
  const getIsDisabled = () => !isDone && idx !== 0 && !showSeparator
  return (
    <div className="container-sm d-flex flex-column text-start lesson-container">
      <h5>
        Lesson {idx + 1}: {title}
      </h5>
      <p className="common-font-size">{shortDescription}</p>
      <div className="d-flex flex-row justify-content-between">
        <Difficulty difficulty={difficulty} />
        <button
          disabled={getIsDisabled()}
          onClick={
            !getIsDisabled()
              ? () =>
                  history.push(singleLessonPage.path.replace(':id', idx + 1))
              : null
          }
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
