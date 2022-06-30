import LoginForm from '../components/pages/login/LoginForm';
import {useEffect} from 'react';
import {learnPage, loginPage} from '../config/routes';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

/**
 *
 * @component
 * Login Page
 * @returns {JSX.Element}
 *
 */

const LoginPage = () => {
  const navigate = useNavigate();

  const {auth: {isAuthenticated}} = useSelector(state => state);

  useEffect(() => {
    if (window.location.pathname === loginPage.path && isAuthenticated) {
      navigate(learnPage.path);
    }
  }, [isAuthenticated, navigate]);


  return (
    <section className="container-lg d-flex justify-content-center flex-column text-center login-page-container">
      <Title/>
      <LoginForm/>
    </section>
  );
};


const Title = () => (
  <p>Welcome, good to see you again! <br/>
    You can use your email and password to log in</p>
);


export default LoginPage;
