import smallLogo from '../../assets/img/small-logo.png'
import './style.css'
import { homePage, pagePaths } from '../../config/routes'
import useNavigationUtils from '../../hooks/useNavigationUtils'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { isTrueState } from '../../constants/state.enum'

const Navigation = () => {
  const [navigationLinks, setNavigationLinks] = useState([])

  const {
    auth: { isAuthenticated, userInfo },
  } = useSelector((state) => state)
  const { onNavLinkClickHandle, getNavItemClassName } = useNavigationUtils()

  useEffect(() => {
    isTrueState(isAuthenticated)
      ? setNavigationLinks(pagePaths.privateRoutes)
      : setNavigationLinks(pagePaths.publicRoutes)
  }, [isAuthenticated])

  return (
    <header className="container-md">
      <nav className="navbar navbar-expand-lg mt-5">
        <span
          className="custom-href navbar-brand"
          onClick={() => onNavLinkClickHandle(homePage.path)}
        >
          <img
            src={smallLogo}
            alt=""
            width="56"
            height="56"
            className="d-inline-block align-text-top"
          />
        </span>
        <div
          className={`container-md d-flex justify-content-${
            isTrueState(isAuthenticated) ? 'start' : 'end'
          } nav-links`}
        >
          {navigationLinks
            .filter((page) => !page.ignoreNav)
            .map((page, idx) => (
              <span
                key={idx}
                onClick={() => onNavLinkClickHandle(page.path)}
                className={getNavItemClassName(page.path)}
              >
                {page.title.toUpperCase()}
              </span>
            ))}
        </div>
        {isTrueState(isAuthenticated) ? (
          <div className="container-md ml-5 d-flex justify-content-end nav-links">
            <span>Hi, {userInfo.firstName} </span>
          </div>
        ) : null}
      </nav>
    </header>
  )
}

export default Navigation
