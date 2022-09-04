const SubmitButton = ({ buttonTitle, ...props }) => {
  return (
    <button className="secondary-color submit-button" {...props}>
      {buttonTitle}
    </button>
  )
}

export default SubmitButton
