import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  validateEmailAddress,
  validatePasswords,
} from '../../../utils/validation/index'
import {
  commonStateEnum,
  isInitialState,
  isSuccessState,
} from '../../../constants/state.enum'
import {
  resetPassword,
  resetPasswordConfirm,
  setResetPasswordErrors,
} from '../../../store/auth/actions'
import ResetPasswordForm from './reset-password.form'
import useForm from '../../../hooks/useForm'

const ResetPasswordFormWrapper = ({ token }) => {
  const dispatch = useDispatch()

  const {
    auth: { resetPasswordErrors },
  } = useSelector((state) => state)

  const { inputState, onInputChange, errors, setErrors } = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isSuccess, setIsSuccess] = useState(commonStateEnum.INITIAL_STATE)

  useEffect(() => {
    if (
      !isInitialState(resetPasswordErrors) &&
      !isSuccessState(resetPasswordErrors)
    ) {
      setErrors(resetPasswordErrors)
    }
  }, [resetPasswordErrors])

  useEffect(() => {
    if (isSuccessState(resetPasswordErrors)) {
      setIsSuccess(commonStateEnum.TRUE)
      dispatch(setResetPasswordErrors(commonStateEnum.INITIAL_STATE))
    }
  }, [resetPasswordErrors])

  const handleSubmit = (event) => {
    event.preventDefault()
    const isEmailEvent = event.target.name === 'email'
    const { email, password, confirmPassword } = inputState

    const { isValid, errors: validationErrors } = isEmailEvent
      ? validateEmailAddress(email)
      : validatePasswords({ password, confirmPassword })

    if (!isValid) {
      setErrors({ ...errors, ...validationErrors })
    } else {
      setErrors({})
      isEmailEvent
        ? dispatch(resetPassword(email))
        : dispatch(resetPasswordConfirm(password, token))
    }
  }
  return (
    <ResetPasswordForm
      handleOnInputChange={onInputChange}
      errors={errors}
      inputState={inputState}
      handleSubmit={handleSubmit}
      isSuccess={isSuccess}
      token={token}
    />
  )
}

export default ResetPasswordFormWrapper
