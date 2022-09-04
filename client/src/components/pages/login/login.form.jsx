import LocalLoginForm from './local-login.form'
import ThirdPartyLogin from './third-party-login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { login } from '../../../store/auth/actions'
import './style.css'
import { verifyLoginInformation } from '../../../utils/validation'
import { useHistory } from 'react-router'
import { learnPage } from '../../../config/routes'
import { isTrueState } from '../../../constants/state.enum'
import useForm from '../../../hooks/useForm'

/**
 *
 * @component
 * Login Form
 * @returns {JSX.Element}
 *
 */

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    auth: { errors: authErrors, isAuthenticated },
  } = useSelector((state) => state)

  const { inputState, onInputChange, errors, setErrors } = useForm({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (Object.values(authErrors).length > 0) {
      setErrors(authErrors)
    }
  }, [authErrors])

  useEffect(() => {
    if (isTrueState(isAuthenticated)) {
      history.push(learnPage.path)
    }
  }, [isAuthenticated, history])

  const isGithubEvent = (event) =>
    event.nativeEvent.submitter.className.includes('github-button')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Workaround
    if (isGithubEvent(event)) return

    const { isValid, errors } = verifyLoginInformation({ ...inputState })
    if (!isValid) {
      setErrors(errors)
    } else {
      setErrors({})
      dispatch(login({ ...inputState }))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="container-lg d-flex justify-content-center flex-column text-center login-form-container"
    >
      <LocalLoginForm
        inputState={inputState}
        onInputChange={onInputChange}
        errors={errors}
      />
      <SeparatorLine />
      <ThirdPartyLogin />
    </form>
  )
}

const SeparatorLine = () => {
  return (
    <>
      <hr />
      <span>or</span>
      <hr style={{ marginTop: '5px' }} />
    </>
  )
}

export default LoginForm
