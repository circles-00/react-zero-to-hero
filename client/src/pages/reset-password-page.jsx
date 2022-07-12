import ResetPasswordFormWrapper from '../components/pages/reset-password/reset-password.form.wrapper'
import { useParams } from 'react-router'
import useAuthRedirect from '../hooks/useAuthRedirect'
import { isFalseState } from '../constants/state.enum'

const ResetPasswordPage = () => {
  const { token } = useParams()
  const { isAuthenticated } = useAuthRedirect()

  return isFalseState(isAuthenticated) ? (
    <section className="container-lg d-flex justify-content-center flex-column text-center login-page-container">
      <Title />
      <ResetPasswordFormWrapper token={token} />
    </section>
  ) : null
}

const Title = () => (
  <p>
    Welcome, good to see you again! <br />
    Please enter your email address in order to reset your password
  </p>
)

export default ResetPasswordPage
