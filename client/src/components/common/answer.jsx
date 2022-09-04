import RadioButton from './radio.button'

const Answer = ({ id, onRadioChange, isAnswerSelected, description }) => {
  return (
    <div className="answer-container d-flex flex-row justify-content-between align-items-center">
      <RadioButton
        id={id}
        onRadioChange={onRadioChange}
        isActive={isAnswerSelected}
      />
      <p>{description}</p>
    </div>
  )
}

export default Answer
