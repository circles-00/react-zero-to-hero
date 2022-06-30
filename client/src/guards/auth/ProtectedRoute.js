import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import {loginPage} from '../../config/routes';

// TODO: Implement Loading Spinner
const LoadingSpinner = () => {}

/**
 * @component
 * Auth Guard, protected routes
 * @param path
 * @param Component
 * @param rest
 * @returns {JSX.Element}
 */

function ProtectedRoute({ path, component: Component, ...rest }) {
  const {
    auth: { isAuthenticated }
  } = useSelector(state => state)

  // Mock
  const isLoading = false;

  return (
    isLoading ? (
      <LoadingSpinner />
    ) : isAuthenticated ? (
      <Component {...rest} />
    ) : (
      <Navigate to={{ pathname: loginPage.path }} />
    )
  )
}

export default ProtectedRoute
