import CustomInput from '../../common/input'
import { isTrueState } from '../../../constants/state.enum'
import SubmitButton from '../../common/submit.button'

const ResetPasswordForm = ({
  inputState = { email: '', password: '', confirmPassword: '' },
  errors,
  handleSubmit,
  isSuccess,
  token,
  handleOnInputChange,
}) => {
  return (
    <form
      name={!token ? 'email' : 'submit'}
      onSubmit={handleSubmit}
      className="container-lg d-flex justify-content-center flex-column text-center login-form-container"
    >
      {isTrueState(isSuccess) ? (
        <p style={{ color: '#90ee90' }}>
          Please confirm your email in order to reset your password!
        </p>
      ) : (
        <>
          {!token ? (
            <CustomInput
              value={inputState.email}
              onChange={handleOnInputChange}
              errors={errors.email}
              type="text"
              name="email"
              placeholder="Email Address"
              label="Email Address"
              labelStyle={{ textAlign: 'start' }}
            />
          ) : (
            <>
              <CustomInput
                value={inputState.password}
                onChange={handleOnInputChange}
                errors={errors.password}
                type="password"
                name="password"
                placeholder="Password"
                label="Password"
                labelStyle={{ textAlign: 'start' }}
              />
              <CustomInput
                value={inputState.confirmPassword}
                onChange={handleOnInputChange}
                errors={errors.confirmPassword}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                labelStyle={{ textAlign: 'start' }}
              />
            </>
          )}

          <div className="d-flex flex-row justify-content-between">
            <SubmitButton buttonTitle={'Submit'} />
          </div>
        </>
      )}
    </form>
  )
}

export default ResetPasswordForm
