import './App.css'
import { useEffect } from 'react'
import {
  authUserWithToken,
  getUserInfo,
  setNotAuthenticated,
} from './store/auth/actions'
import jwtDecode from 'jwt-decode'
import { setAuthToken } from './utils/auth'
import { store } from './store'
import { loginPage, pagePaths } from './config/routes'
import Navigation from './components/common/navigation'
import Footer from './components/common/footer'
import { Redirect, Route, Switch } from 'react-router'
import AuthRoute from './guards/auth/auth.route'
import { useSelector } from 'react-redux'
import Loader from './components/common/loader'
import { isTrueState } from './constants/state.enum'

function App() {
  const {
    feedback: { isLoading },
  } = useSelector((state) => state)

  useEffect(() => {
    if (localStorage.jwtToken) {
      const rawToken = localStorage.jwtToken.split(' ')[1]
      const decoded = jwtDecode(rawToken)
      setAuthToken(localStorage.jwtToken)
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        //  TODO: get new accessToken
        store.dispatch(setNotAuthenticated())
      } else {
        store.dispatch(authUserWithToken({ accessToken: rawToken }))
        store.dispatch(getUserInfo(decoded?.sub))
      }
    } else {
      store.dispatch(setNotAuthenticated())
    }
  }, [])

  return (
    <>
      <Navigation />
      <Switch>
        {pagePaths.publicRoutes.map((route) => (
          <Route
            key={route.path}
            exact
            path={route.path}
            render={() =>
              isTrueState(isLoading) ? <Loader show={true} /> : route.element
            }
          ></Route>
        ))}
        {pagePaths.privateRoutes.map((route) => (
          <AuthRoute
            key={route.path}
            redirectTo={loginPage.path}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        <Redirect to={{ pathname: '/' }} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
