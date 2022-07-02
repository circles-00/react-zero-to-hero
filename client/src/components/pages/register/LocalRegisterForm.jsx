import PropTypes from 'prop-types'
import CustomInput from '../../common/input'

/**
 * TODO: Make this more generic
 *
 * @component
 * Returns form body for local auth strategy
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @param confirmPassword
 * @param handleOnFirstNameChange
 * @param handleOnLastNameChange
 * @param handleOnEmailChange
 * @param handleOnPasswordChange
 * @param handleOnConfirmPasswordChange
 * @param errors
 * @returns {JSX.Element}
 *
 */

const LocalRegisterForm = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  handleOnFirstNameChange,
  handleOnLastNameChange,
  handleOnEmailChange,
  handleOnPasswordChange,
  handleOnConfirmPasswordChange,
  errors = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null
  },
}) => {
  return (
    <>
      <CustomInput value={firstName} onChange={handleOnFirstNameChange} errors={errors.firstName} type='text' name='firstName'
                   placeholder='First Name' label='First Name' labelStyle={{ textAlign: 'start' }} />

      <CustomInput value={lastName} onChange={handleOnLastNameChange} errors={errors.lastName} type='text' name='lastName'
                   placeholder='Last Name' label='Last Name' labelStyle={{ textAlign: 'start' }} />

      <CustomInput value={email} onChange={handleOnEmailChange} errors={errors.email} type='text' name='email'
                   placeholder='Email Address' label='Email Address' labelStyle={{ textAlign: 'start' }} />


      <CustomInput value={password} onChange={handleOnPasswordChange} errors={errors.password} type='password'
                   name='password' placeholder='Password' label='Password'
                   labelStyle={{ textAlign: 'start', marginTop: '10px' }} />

      <CustomInput value={confirmPassword} onChange={handleOnConfirmPasswordChange} errors={errors.confirmPassword} type='password'
                   name='password' placeholder='Confirm Password' label='Confirm Password'
                   labelStyle={{ textAlign: 'start', marginTop: '10px' }} />

      <div className='d-flex flex-row justify-content-between'>
        <button className='secondary-color' type='submit'>Register</button>
        <p>Forgot your password?</p>
      </div>
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

