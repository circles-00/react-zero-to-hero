import PropTypes from 'prop-types'
import validator from 'validator'
import isEmpty from 'lodash.isempty'

const { isEmail } = validator

const validateString = (string, stringName) => {
  const minimumNumberOfChars = 3

  let errors
  let isValid = true

  if (isEmpty(string)) errors = `${stringName} cannot be empty`
  else if (string.length < minimumNumberOfChars)
    errors = `${stringName} must have at least ${minimumNumberOfChars} characters`

  if (errors) isValid = false

  return { isValid, errors }
}

const validatePassword = ({ password }) => {
  let errors = {}
  let isValid = true

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
    errors.password =
      'Password must have minimum 8 characters, and at least one number'

  if (Object.values(errors).length > 0) isValid = false

  return { isValid, errors }
}

export const validatePasswords = ({ password, confirmPassword }) => {
  let errors = {}
  let isValid = true

  const { errors: passwordErrors } = validatePassword({ password })
  errors = { ...errors, ...passwordErrors }

  // eslint-disable-next-line security/detect-possible-timing-attacks
  if (password !== confirmPassword)
    errors.confirmPassword = 'Passwords do not match'

  if (Object.values(errors).length > 0) isValid = false

  return { isValid, errors }
}

export const validateEmailAddress = (email) => {
  let errors = {}
  let isValid = true

  if (isEmpty(email)) errors.email = 'Email cannot be empty'
  else if (!isEmail(email)) errors.email = 'Invalid Email Address'

  if (Object.values(errors).length > 0) isValid = false

  return { isValid, errors }
}

const verifyLoginInformation = ({ email, password }) => {
  let errors = {}
  let isValid = false

  const { errors: emailErrors } = validateEmailAddress(email)
  const { errors: passwordErrors } = validatePassword({ password })

  errors = { ...errors, ...emailErrors, ...passwordErrors }

  if (Object.values(errors).length === 0) isValid = true

  return { isValid, errors }
}

const verifyRegisterInformation = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => {
  let errors = {}
  let isValid = false

  const { isValid: isFirstNameValid, errors: firstNameErrors } = validateString(
    firstName,
    'First Name',
  )
  if (!isFirstNameValid) errors.firstName = firstNameErrors

  const { isValid: isLastNameValid, errors: lastNameErrors } = validateString(
    lastName,
    'Last Name',
  )
  if (!isLastNameValid) errors.lastName = lastNameErrors

  const { errors: emailErrors } = validateEmailAddress(email)

  const { errors: passwordsErrors } = validatePasswords({
    password,
    confirmPassword,
  })

  errors = { ...errors, ...emailErrors, ...passwordsErrors }

  if (Object.values(errors).length === 0) isValid = true

  return { isValid, errors }
}

verifyLoginInformation.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
}

export { verifyLoginInformation, verifyRegisterInformation }
