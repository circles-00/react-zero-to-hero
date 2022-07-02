import ThirdPartyLogin from '../login/ThirdPartyLogin'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { register } from '../../../store/auth/actions'
import { verifyRegisterInformation } from '../../../utils/validation'
import { learnPage } from '../../../config/routes'
import LocalRegisterForm from './LocalRegisterForm'
import { useHistory } from 'react-router'
import { isTrueState } from '../../../constants/state.enum'

/**
 *
 * @component
 * Login Form
 * @returns {JSX.Element}
 *
 */

const RegisterForm = () => {
  const dispatch = useDispatch(), history = useHistory(), {
    auth: {
      errors: authErrors,
      isAuthenticated,
    },
  } = useSelector(state => state), [firstName, setFirstName] = useState(''), [lastName, setLastName] = useState(''), [email, setEmail] = useState(''), [password, setPassword] = useState(''), [confirmPassword, setConfirmPassword] = useState(''), [errors, setErrors] = useState({})


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

  const handleOnFirstNameChange = (event) => {
    setErrors({ ...errors, firstName: null })
    setFirstName(event.target.value)
  }

  const handleOnLastNameChange = (event) => {
    setErrors({ ...errors, lastName: null })
    setLastName(event.target.value)
  }

  const handleOnEmailChange = (event) => {
    setErrors({ ...errors, email: null })
    setEmail(event.target.value)
  }

  const handleOnPasswordChange = (event) => {
    setErrors({ ...errors, password: null })
    setPassword(event.target.value)
  }

  const handleOnConfirmPasswordChange = (event) => {
    setErrors({ ...errors, confirmPassword: null })
    setConfirmPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { isValid, errors } = verifyRegisterInformation({ firstName, lastName, email, password, confirmPassword })
    if (!isValid) {
      setErrors(errors)
    } else {
      setErrors({})
      dispatch(register({ firstName, lastName, email, password }))
    }
  }

  return (
    <form onSubmit={handleSubmit}
          className='container-lg d-flex justify-content-center flex-column text-center login-form-container'>
      <LocalRegisterForm firstName={firstName} lastName={lastName} email={email} password={password}
                         confirmPassword={confirmPassword} handleOnFirstNameChange={handleOnFirstNameChange}
                         handleOnLastNameChange={handleOnLastNameChange} handleOnEmailChange={handleOnEmailChange}
                         handleOnPasswordChange={handleOnPasswordChange}
                         handleOnConfirmPasswordChange={handleOnConfirmPasswordChange} errors={errors} />
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
