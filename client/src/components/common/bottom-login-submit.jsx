import { useHistory } from 'react-router'
import { resetPasswordPage } from '../../config/routes'

const BottomLoginSubmit = ({ buttonTitle }) => {
  const history = useHistory()

  return (
    <div className="d-flex flex-row justify-content-between">
      <button className="secondary-color" type="submit">
        {buttonTitle}
      </button>
      <p
        className="custom-href"
        onClick={() => history.push(resetPasswordPage.path)}
      >
        Forgot your password?
      </p>
    </div>
  )
}

export default BottomLoginSubmit
