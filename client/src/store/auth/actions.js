import {SET_AUTH_ERRORS, SET_IS_AUTHENTICATED, SET_NOT_AUTHENTICATED, SET_USER_INFO} from './actionTypes';
import axios from 'axios';
import {apiPaths} from '../../constants/apiPaths';
import {setAuthToken} from '../../utils/auth';

export const setIsAuthenticated = (payload) => ({
  type: SET_IS_AUTHENTICATED,
  payload
});

export const setNotAuthenticated = () => ({
  type: SET_NOT_AUTHENTICATED
})

export const setUserInfo = (payload) => ({
  type: SET_USER_INFO,
  payload
})

export const setAuthErrors = (payload) => ({
  type: SET_AUTH_ERRORS,
  payload
})

export const authUserWithToken = ({accessToken, user}) => async dispatch => {
  setAuthToken(accessToken)
  dispatch(setIsAuthenticated(user))
  localStorage.setItem('jwtToken', `Bearer ${accessToken}`)
}

export const login = (payload) => async dispatch => {
  try {
    const { data: {accessToken, user}} = await axios[apiPaths.loginApi.method](apiPaths.loginApi.path, {strategy: 'local', ...payload});

    dispatch(authUserWithToken({accessToken, user}))
  } catch (err) {
    dispatch(setNotAuthenticated())
    dispatch(setAuthErrors({password: err.response.data.message}))
  }
}

export const getUserInfo = (userId) => async dispatch => {
  try {
    const {data} = await axios[apiPaths.getUserInfoApi.method](apiPaths.getUserInfoApi.path.replace(':id', userId));
    dispatch(setUserInfo(data))
  } catch (err) {
    console.error(err)
  }
};

