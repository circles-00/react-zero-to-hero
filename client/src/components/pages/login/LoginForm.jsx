import LocalLoginForm from './LocalLoginForm';
import ThirdPartyLogin from './ThirdPartyLogin';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {login} from '../../../store/auth/actions';
import './style.css';
import {verifyLoginInformation} from '../../../utils/validation';
import { useHistory } from 'react-router'
import {learnPage} from '../../../config/routes';
import { isTrueState } from '../../../constants/state.enum'

/**
 *
 * @component
 * Login Form
 * @returns {JSX.Element}
 *
 */

const LoginForm = () => {

  const dispatch = useDispatch();
  const history = useHistory()

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
    if(isTrueState(isAuthenticated)) {
      history.push(learnPage.path)
    }
  }, [isAuthenticated, history])

  const handleOnEmailChange = (event) => {
    setErrors({...errors, email: null})
    setEmail(event.target.value);
  };

  const handleOnPasswordChange = (event) => {
    setErrors({...errors, password: null})
    setPassword(event.target.value);
  };

  const isGithubEvent = (event) => (
    event.nativeEvent.submitter.className.includes('github-button')
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    // Workaround
    if(isGithubEvent(event)) return

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
