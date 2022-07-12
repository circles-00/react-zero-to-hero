import PropTypes from 'prop-types'
import CustomInput from '../../common/input'
import BottomLoginSubmit from '../../common/bottom-login-submit'

/**
 * @component
 * Returns form body for local auth strategy
 * @param email
 * @param password
 * @param handleOnEmailChange
 * @param handleOnPasswordChange
 * @param errors
 * @returns {JSX.Element}
 *
 */

const LocalLoginForm = ({
  email,
  password,
  handleOnEmailChange,
  handleOnPasswordChange,
  errors,
}) => {
  return (
    <>
      <CustomInput
        value={email}
        onChange={handleOnEmailChange}
        errors={errors.email}
        type="text"
        name="email"
        placeholder="Email Address"
        label="Email Address"
        labelStyle={{ textAlign: 'start' }}
      />

      <CustomInput
        value={password}
        onChange={handleOnPasswordChange}
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
