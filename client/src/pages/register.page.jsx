import RegisterForm from '../components/pages/register/register.form'
import { isFalseState } from '../constants/state.enum'
import useAuthRedirect from '../hooks/useAuthRedirect'

/**
 *
 * @component
 * Login Page
 * @returns {JSX.Element}
 *
 */

const RegisterPage = () => {
  const { isAuthenticated } = useAuthRedirect()

  return isFalseState(isAuthenticated) ? (
    <section className="container-lg d-flex justify-content-center flex-column text-center login-page-container">
      <Title />
      <RegisterForm />
    </section>
  ) : null
}

const Title = () => (
  <p>
    A world class course for ReactJS! <br />
    Join to get personalized lessons, practice exams, certification and many
    more! <br />
    We’ll save all of your progress.
  </p>
)

export default RegisterPage
