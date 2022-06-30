import LocalLoginForm from './LocalLoginForm';
import ThirdPartyLogin from './ThirdPartyLogin';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {login} from '../../../store/auth/actions';
import './style.css';
import {verifyLoginInformation} from '../../../utils/validation';
import {useNavigate} from 'react-router-dom';
import {learnPage} from '../../../config/routes';

/**
 *
 * @component
 * Login Form
 * @returns {JSX.Element}
 *
 */

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { auth: {errors: authErrors,  isAuthenticated}} = useSelector(state => state)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(Object.values(authErrors).length > 0) {
      setErrors(authErrors)
    }
  }, [authErrors])

  useEffect(() => {
    if(isAuthenticated) {
      navigate(learnPage.path)
    }
  }, [isAuthenticated, navigate])

  const handleOnEmailChange = (event) => {
    setErrors({...errors, email: null})
    setEmail(event.target.value);
  };

  const handleOnPasswordChange = (event) => {
    setErrors({...errors, password: null})
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {isValid, errors} = verifyLoginInformation({email, password});
    if (!isValid) {
      setErrors(errors);
    } else {
      setErrors({});
      dispatch(login({email, password}));
    }
  };

  return (
    <form onSubmit={handleSubmit}
          className="container-lg d-flex justify-content-center flex-column text-center login-form-container">
      <LocalLoginForm email={email} password={password} handleOnEmailChange={handleOnEmailChange}
                      handleOnPasswordChange={handleOnPasswordChange} errors={errors} />
      <SeparatorLine/>
      <ThirdPartyLogin/>
    </form>
  );
};

const SeparatorLine = () => {
  return (
    <>
      <hr/>
      <span>or</span>
      <hr style={{marginTop: '5px'}}/>
    </>
  );
};

export default LoginForm;
