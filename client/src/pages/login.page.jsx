import LoginForm from '../components/pages/login/login.form'
import { isFalseState } from '../constants/state.enum'
import useAuthRedirect from '../hooks/useAuthRedirect'

/**
 *
 * @component
 * Login Page
 * @returns {JSX.Element}
 *
 */

const LoginPage = () => {
  const { isAuthenticated } = useAuthRedirect()

  return isFalseState(isAuthenticated) ? (
    <section className="container-lg d-flex justify-content-center flex-column text-center login-page-container">
      <Title />
      <LoginForm />
    </section>
  ) : null
}

const Title = () => (
  <p>
    Welcome, good to see you again! <br />
    You can use your email and password to log in
  </p>
)

export default LoginPage
