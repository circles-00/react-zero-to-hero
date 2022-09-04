import ThirdPartyLogin from '../login/third-party-login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { register } from '../../../store/auth/actions'
import { verifyRegisterInformation } from '../../../utils/validation'
import { learnPage } from '../../../config/routes'
import LocalRegisterForm from './local-register.form'
import { useHistory } from 'react-router'
import { isTrueState } from '../../../constants/state.enum'
import useForm from '../../../hooks/useForm'

/**
 *
 * @component
 * Login Form
 * @returns {JSX.Element}
 *
 */

const RegisterForm = () => {
  const dispatch = useDispatch(),
    history = useHistory(),
    {
      auth: { errors: authErrors, isAuthenticated },
    } = useSelector((state) => state)

  const { inputState, onInputChange, errors, setErrors } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const { isValid, errors } = verifyRegisterInformation({ ...inputState })
    if (!isValid) {
      setErrors(errors)
    } else {
      setErrors({})
      dispatch(register({ ...inputState }))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="container-lg d-flex justify-content-center flex-column text-center login-form-container"
    >
      <LocalRegisterForm
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

export default RegisterForm
