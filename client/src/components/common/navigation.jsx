import smallLogo from '../../assets/img/small-logo.png';
import './style.css'
import { homePage, pagePaths } from '../../config/routes'
import useNavigationUtils from '../../hooks/useNavigationUtils'

const Navigation = () => {

  const { onNavLinkClickHandle, getNavItemClassName } = useNavigationUtils()

  return (
    <header className='container-md'>
      <nav className="navbar navbar-expand-lg mt-5">
        <span className="custom-href navbar-brand" onClick={() => onNavLinkClickHandle(homePage.path)}>
          <img src={smallLogo} alt="" width="56" height="56"
               className="d-inline-block align-text-top"/>
        </span>
        <div className="container-md d-flex justify-content-end nav-links">
          {pagePaths.publicRoutes.filter(page => !page.ignoreNav).map((page, idx) => (
            <span key={idx} onClick={() => onNavLinkClickHandle(page.path)}
                  className={getNavItemClassName(page.path)}>{page.title.toUpperCase()}</span>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navigation
