import Difficulty from './difficulty'
import './style.css'
import { useHistory } from 'react-router'
import { challengePage } from '../../config/routes'

const InfoCard = ({
  idx,
  title,
  shortDescription,
  difficulty,
  isDone,
  showSeparator,
  useSeparatorLogic,
  initBtnText = 'Learn More',
  doneBtnText = 'Read Again',
  btnFontSize,
  onButtonClick,
  isPractice,
}) => {
  const history = useHistory()

  const getIsDisabled = () =>
    (!isDone && idx !== 0 && !showSeparator && useSeparatorLogic) ||
    (!useSeparatorLogic && isDone)

  const handleOnButtonClick = () => {
    isPractice
      ? history.push(challengePage.path.replace(':id', idx + 1))
      : onButtonClick(idx)
  }

  return (
    <div className="container-sm d-flex flex-column text-start info-card-container">
      <h5>
        Lesson {idx + 1}: {title}
      </h5>
      <p className="common-font-size">{shortDescription}</p>
      <div className="d-flex flex-row justify-content-between">
        <Difficulty difficulty={difficulty} />
        <button
          disabled={getIsDisabled()}
          onClick={!getIsDisabled() ? () => handleOnButtonClick() : null}
          className={`justify-content-end ${getIsDisabled() ? 'disabled' : ''}`}
          style={{
            color: '#7000B1',
            fontSize: btnFontSize ? btnFontSize : null,
          }}
        >
          {isDone ? doneBtnText.toUpperCase() : initBtnText.toUpperCase()}
        </button>
      </div>
    </div>
  )
}

export default InfoCard
