import { useState } from 'react'

const useForm = ({ initialValues }) => {
  const [inputState, setInputState] = useState({ ...initialValues })
  const [errors, setErrors] = useState({})

  const onInputChange = (event) => {
    setErrors({ ...errors, [event.target.name]: null })
    setInputState({ ...inputState, [event.target.name]: event.target.value })
  }

  return { inputState, setInputState, onInputChange, errors, setErrors }
}

export default useForm
