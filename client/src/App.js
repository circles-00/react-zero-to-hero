import './App.css';
import {useEffect} from 'react';
import {authUserWithToken, getUserInfo} from './store/auth/actions';
import jwtDecode from 'jwt-decode';
import {setAuthToken} from './utils/auth';
import {store} from './store';
import {pagePaths} from './config/routes';
import { Routes} from 'react-router';
import { Route } from 'react-router'
import Navigation from './components/common/navigation';
import Footer from './components/common/footer';
import ProtectedRoute from './guards/auth/ProtectedRoute';

function App() {

  useEffect(() => {
    if (localStorage.jwtToken) {
      const rawToken = localStorage.jwtToken.split(' ')[1]
      const decoded = jwtDecode(rawToken)
      setAuthToken(localStorage.jwtToken)
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
      //  TODO: get new accessToken
      } else {
        store.dispatch(authUserWithToken({accessToken: rawToken}))
        store.dispatch(getUserInfo(decoded?.sub))
      }
    }
  }, [])

  return (
    <>
        <Navigation />
          <Routes>
            {pagePaths.publicRoutes.map(route => <Route key={route.path} exact path='/' {...route}></Route>)}
            {pagePaths.privateRoutes.map(route => <Route key={route.path} exact path={route.path} element={<ProtectedRoute component={route.component} {...route} />}></Route>)}
          </Routes>
      <Footer />
    </>
  );
}

export default App;
