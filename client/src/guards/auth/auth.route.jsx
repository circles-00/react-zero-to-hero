import React, { useEffect, useState } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import AuthRedirectRoute from './auth.redirect.route'

function AuthRoute({
  redirectTo,
  type,
  component: Component,
  render: RenderComponent,
  path,
  ...rest
}) {
  const dispatch = useDispatch()
  const location = useLocation()
  const [canPass, setCanPass] = useState(true)

  useEffect(() => {
    if (localStorage.jwtToken && location.pathname === path) {
      const decoded = jwt_decode(localStorage.jwtToken.split(' ')[1])
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        setCanPass(false)
      }
    }
  }, [dispatch, location, path])

  useEffect(() => {
    return () => {
      setCanPass(false)
    }
  }, [])

  return (
    <Route
      exact
      {...rest}
      render={props =>
        canPass ? (
          Component ? (
            <Component {...props} />
          ) : (
            RenderComponent()
          )
        ) : (
          <AuthRedirectRoute component={Component} path={path} to={path} />
        )
      }
    />
  )
}

export default AuthRoute
