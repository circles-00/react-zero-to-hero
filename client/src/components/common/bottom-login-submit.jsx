import { useHistory } from 'react-router'
import { resetPasswordPage } from '../../config/routes'
import SubmitButton from './submit.button'

const BottomLoginSubmit = ({ buttonTitle }) => {
  const history = useHistory()

  return (
    <div className="d-flex flex-row justify-content-between">
      <SubmitButton buttonTitle={buttonTitle} />
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
