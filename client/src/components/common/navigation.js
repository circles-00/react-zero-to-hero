import smallLogo from '../../assets/img/small-logo.png';
import './style.css'
import {homePage, loginPage} from '../../config/routes';
import {useNavigate} from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate()

  return (
    <header className='container-md'>
      <nav className="navbar navbar-expand-lg mt-5">
        <span className="custom-href navbar-brand" onClick={() => navigate(homePage.path)}>
          <img src={smallLogo} alt="" width="56" height="56"
               className="d-inline-block align-text-top"/>
        </span>
        <div className="container-md d-flex justify-content-end nav-links">
          <span onClick={() => navigate(loginPage.path)} className="custom-href nav-link-custom">LOG IN</span>
          <span className="custom-href nav-link-custom">REGISTER</span>
        </div>
      </nav>
    </header>
  );
};

export default Navigation
