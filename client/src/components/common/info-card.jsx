import Difficulty from './difficulty'
import './style.css'

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
}) => {
  const getIsDisabled = () =>
    (!isDone && idx !== 0 && !showSeparator && useSeparatorLogic) ||
    (!useSeparatorLogic && isDone)
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
          onClick={!getIsDisabled() ? () => onButtonClick(idx) : null}
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
