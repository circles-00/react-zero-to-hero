import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router'
import jwt_decode from 'jwt-decode'
import Loader from '../../components/common/loader'
import { unSetLoading } from '../../store/feedback/actions'
import { loginPage } from '../../config/routes'
import { isTrueState } from '../../constants/state.enum'

function AuthRoute({ path, component: Component, ...rest }) {
  const {
    feedback: { isLoading },
    auth: { isAuthenticated },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.jwtToken && location.pathname === path) {
      const decoded = jwt_decode(localStorage.jwtToken.split(' ')[1])
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        // TODO: Get Access Token
      }
      dispatch(unSetLoading())
    }
  }, [dispatch, location, path])

  return (
    <Route
      path={path}
      render={() =>
        isTrueState(isLoading) ? (
          <Loader show={true} />
        ) : isTrueState(isAuthenticated) ? (
          <Component {...rest} />
        ) : (
          <Redirect to={{ pathname: loginPage.path }} />
        )
      }
    />
  )
}

export default AuthRoute
