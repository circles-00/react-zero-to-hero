import smallLogo from '../../assets/img/small-logo.png'
import './style.css'
import { homePage, pagePaths } from '../../config/routes'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import useNavigationUtils from '../../hooks/useNavigationUtils'

const NavigationAuthenticated = () => {
  const history = useHistory()
  const { auth: { userInfo } } = useSelector(state => state)

  const { onNavLinkClickHandle, getNavItemClassName } = useNavigationUtils()

  return (
    <header className='container-md'>
      <nav className='navbar navbar-expand-lg mt-5'>
        <span className='custom-href navbar-brand' onClick={() => onNavLinkClickHandle(homePage.path)}>
          <img src={smallLogo} alt='' width='56' height='56'
               className='d-inline-block align-text-top' />
        </span>
        <div className='container-md ml-5 d-flex justify-content-start nav-links'>
          {pagePaths.privateRoutes.filter(page => !page.ignoreNav).map((page, idx) => (
            <span key={idx} onClick={() => onNavLinkClickHandle(page.path)}
                  className={getNavItemClassName(page.path)}>{page.title.toUpperCase()}</span>
          ))}
        </div>
        <div className='container-md ml-5 d-flex justify-content-end nav-links'>
          <span>Hi, {userInfo.firstName} </span>
        </div>
      </nav>
    </header>
  )
}

export default NavigationAuthenticated
