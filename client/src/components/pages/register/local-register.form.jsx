import PropTypes from 'prop-types'
import CustomInput from '../../common/input'
import BottomLoginSubmit from '../../common/bottom-login-submit'

/**
 * TODO: Make this more generic
 *
 * @component
 * Returns form body for local auth strategy
 * @param firstName
 * @param errors
 * @returns {JSX.Element}
 *
 */

const LocalRegisterForm = ({
  inputState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  onInputChange,
  errors = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  },
}) => {
  return (
    <>
      <CustomInput
        value={inputState.firstName}
        onChange={onInputChange}
        errors={errors.firstName}
        type="text"
        name="firstName"
        placeholder="First Name"
        label="First Name"
        labelStyle={{ textAlign: 'start' }}
      />

      <CustomInput
        value={inputState.lastName}
        onChange={onInputChange}
        errors={errors.lastName}
        type="text"
        name="lastName"
        placeholder="Last Name"
        label="Last Name"
        labelStyle={{ textAlign: 'start' }}
      />

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

      <CustomInput
        value={inputState.confirmPassword}
        onChange={onInputChange}
        errors={errors.confirmPassword}
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        label="Confirm Password"
        labelStyle={{ textAlign: 'start', marginTop: '10px' }}
      />

      <BottomLoginSubmit buttonTitle="Register" />
    </>
  )
}

LocalRegisterForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  handleOnEmailChange: PropTypes.func,
  handleOnPasswordChange: PropTypes.func,
  errors: PropTypes.object,
}

export default LocalRegisterForm
