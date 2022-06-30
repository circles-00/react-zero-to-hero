import PropTypes from 'prop-types';
import validator from 'validator';

const { isEmail } = validator

const verifyLoginInformation = ({email, password}) => {
  const errors = {}
  let isValid = false

  if(!isEmail(email)) errors.email = 'Invalid Email Address'
  if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) errors.password = 'Password must have minimum 8 characters, and at least one number'

  if(Object.values(errors).length === 0) isValid = true

  return { isValid, errors }
}

verifyLoginInformation.PropTypes = {
  email: PropTypes.string,
  password: PropTypes.string
}


export { verifyLoginInformation }
