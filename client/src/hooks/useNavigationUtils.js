import { useState } from 'react'
import { useHistory } from 'react-router'

const useNavigationUtils = () => {
  const history = useHistory()

  const [count, reRenderComponent] = useState(0)

  const refreshClassName = () => reRenderComponent(count + 1)

  const isNavItemActive = (pagePath) => pagePath === window.location.pathname

  const getNavItemClassName = (pagePath) =>
    `custom-href nav-link-custom ${
      isNavItemActive(pagePath) ? 'nav-link-active' : null
    }`

  const onNavLinkClickHandle = (pagePath) => {
    history.push(pagePath)
    refreshClassName()
  }

  return {
    isNavItemActive,
    getNavItemClassName,
    refreshClassName,
    onNavLinkClickHandle,
  }
}

export default useNavigationUtils
