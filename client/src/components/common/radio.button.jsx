const RadioButton = ({ id, onRadioChange, isActive }) => {
  return (
    <div
      onClick={() => onRadioChange(id)}
      className="radio-container d-flex justify-content-center align-items-center"
    >
      {isActive ? <div className="radio-container-active" /> : null}
    </div>
  )
}

export default RadioButton
