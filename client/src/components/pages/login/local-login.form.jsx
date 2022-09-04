import PropTypes from 'prop-types'
import CustomInput from '../../common/input'
import BottomLoginSubmit from '../../common/bottom-login-submit'

/**
 * @component
 * Returns form body for local auth strategy
 * @param email
 * @param errors
 * @returns {JSX.Element}
 *
 */

const LocalLoginForm = ({
  inputState = { email: '', password: '' },
  onInputChange,
  errors,
}) => {
  return (
    <>
      <CustomInput
        value={inputState.email}
        onChange={onInputChange}
        errors={errors.email}
        type="text"
        name="email"
        placeholder="Email Address"
        label="Email Address"
        labelStyle={{ textAlign: 'start' }}
      />

      <CustomInput
        value={inputState.password}
        onChange={onInputChange}
        errors={errors.password}
        type="password"
        name="password"
        placeholder="Password"
        label="Password"
        labelStyle={{ textAlign: 'start', marginTop: '10px' }}
      />

      <BottomLoginSubmit buttonTitle="Log In" />
    </>
  )
}

LocalLoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  handleOnEmailChange: PropTypes.func,
  handleOnPasswordChange: PropTypes.func,
  errors: PropTypes.object,
}

export default LocalLoginForm
