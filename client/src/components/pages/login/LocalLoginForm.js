import PropTypes from 'prop-types';

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

const LocalLoginForm = ({email, password, handleOnEmailChange, handleOnPasswordChange, errors}) => {
  return (
    <>
      <label style={{textAlign: 'start'}}>Email Address</label>
      <input name="email" placeholder="Email Address" type="text" value={email} onChange={handleOnEmailChange}/>
      {errors.email && <span className='errors'>{errors.email}</span>}

      <label style={{textAlign: 'start', marginTop: '10px'}}>Password</label>
      <input name="password" placeholder="Password" type="password" value={password}
             onChange={handleOnPasswordChange}/>
      {errors.password && <span className='errors'>{errors.password}</span>}

      <div className='d-flex flex-row justify-content-between'>
        <button className='secondary-color' type="submit">Log In</button>
        <p>Forgot your password?</p>
      </div>
    </>
  )
}

LocalLoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  handleOnEmailChange: PropTypes.func,
  handleOnPasswordChange: PropTypes.func,
  errors: PropTypes.object
}

export default LocalLoginForm

