import smallLogo from '../../assets/img/small-logo.png';
import './style.css'
import { homePage, loginPage, registerPage } from '../../config/routes'
import { useHistory } from 'react-router'

const Navigation = () => {
  const history = useHistory()

  return (
    <header className='container-md'>
      <nav className="navbar navbar-expand-lg mt-5">
        <span className="custom-href navbar-brand" onClick={() => history.push(homePage.path)}>
          <img src={smallLogo} alt="" width="56" height="56"
               className="d-inline-block align-text-top"/>
        </span>
        <div className="container-md d-flex justify-content-end nav-links">
          <span onClick={() => history.push(loginPage.path)} className="custom-href nav-link-custom">LOG IN</span>
          <span onClick={() => history.push(registerPage.path)} className="custom-href nav-link-custom">REGISTER</span>
        </div>
      </nav>
    </header>
  );
};

export default Navigation
