import React from 'react'
import PropTypes from 'prop-types'

/**
 * Custom Input Component
 * @param name
 * @param placeholder
 * @param type
 * @param value
 * @param onChange
 * @param errors
 * @param style
 * @param label
 * @param labelClassName
 * @param labelStyle
 * @returns {JSX.Element}
 * @component
 */

const CustomInput = ({
  name,
  placeholder,
  type,
  value,
  onChange,
  errors,
  inputStyle,
  inputClassName,
  label,
  labelStyle,
  labelClassName,
}) => {
  return (
    <>
      {label && (
        <label style={labelStyle} className={labelClassName}>
          {label}
        </label>
      )}{' '}
      <br />
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        style={inputStyle}
        className={inputClassName}
      />
      {errors && <span className="errors">{errors}</span>}
    </>
  )
}

CustomInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errors: PropTypes.string,
  inputStyle: PropTypes.object,
  inputClassName: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  labelClassName: PropTypes.string,
}

export default CustomInput
