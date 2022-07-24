import {
  SET_AUTH_ERRORS,
  SET_IS_AUTHENTICATED,
  SET_NOT_AUTHENTICATED,
  SET_RESET_PASSWORD_ERRORS,
  SET_USER_INFO,
} from './action.types'
import axios from 'axios'
import { apiPaths } from '../../constants/api.paths'
import { setAuthToken } from '../../utils/auth'
import { setLoading, unSetLoading } from '../feedback/actions'
import { commonStateEnum } from '../../constants/state.enum'
import { invalidateLessonsState } from '../lessons/actions'

export const setIsAuthenticated = (payload) => ({
  type: SET_IS_AUTHENTICATED,
  payload,
})

export const setNotAuthenticated = () => ({
  type: SET_NOT_AUTHENTICATED,
})

export const setUserInfo = (payload) => ({
  type: SET_USER_INFO,
  payload,
})

export const setAuthErrors = (payload) => ({
  type: SET_AUTH_ERRORS,
  payload,
})

export const authUserWithToken =
  ({ accessToken }) =>
  (dispatch) => {
    setAuthToken(`Bearer ${accessToken}`)
    dispatch(setIsAuthenticated())
    localStorage.setItem('jwtToken', `Bearer ${accessToken}`)
  }

export const logout = () => (dispatch) => {
  setAuthToken(undefined)
  dispatch(setNotAuthenticated())
  localStorage.removeItem('jwtToken')
  dispatch(invalidateLessonsState())
}

export const login = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const {
      data: { accessToken },
    } = await axios[apiPaths.loginApi.method](apiPaths.loginApi.path, {
      strategy: 'local',
      ...payload,
    })

    dispatch(authUserWithToken({ accessToken }))
    dispatch(getUserInfo())
    dispatch(unSetLoading())
  } catch (err) {
    dispatch(unSetLoading())
    dispatch(setNotAuthenticated())
    dispatch(setAuthErrors({ password: err.response.data.message }))
  }
}

export const register = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading())
    await axios[apiPaths.registerApi.method](apiPaths.registerApi.path, payload)

    dispatch(login({ email: payload.email, password: payload.password }))
    dispatch(unSetLoading())
  } catch (err) {
    dispatch(unSetLoading())
    dispatch(setNotAuthenticated())
    dispatch(setAuthErrors({ password: err.response.data.message }))
  }
}

export const getUserInfo = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const { data } = await axios[apiPaths.getUserInfoApi.method](
      apiPaths.getUserInfoApi.path,
    )
    dispatch(setUserInfo(data))
    dispatch(unSetLoading())
  } catch (err) {
    dispatch(unSetLoading())
    console.error(err)
  }
}

export const thirdPartyLogin = (authCode, method) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const {
      data: { accessToken },
    } = await axios[apiPaths.thirdPartyLoginApi.method](
      apiPaths.thirdPartyLoginApi.path,
      {
        token: authCode,
        method,
      },
    )
    dispatch(authUserWithToken({ accessToken }))
    dispatch(getUserInfo())
    dispatch(unSetLoading())
  } catch (err) {
    dispatch(unSetLoading())
    console.error(err)
  }
}

export const setResetPasswordErrors = (payload) => ({
  type: SET_RESET_PASSWORD_ERRORS,
  payload,
})

export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch(setLoading())
    await axios[apiPaths.resetPasswordApi.method](
      apiPaths.resetPasswordApi.path,
      { email },
    )
    dispatch(setResetPasswordErrors(commonStateEnum.SUCCESS))
    dispatch(unSetLoading())
  } catch (err) {
    dispatch(unSetLoading())
    dispatch(setResetPasswordErrors({ email: err.response.data.message }))
  }
}

export const resetPasswordConfirm = (password, token) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const {
      data: { accessToken },
    } = await axios[apiPaths.resetPasswordConfirmApi.method](
      apiPaths.resetPasswordConfirmApi.path,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    dispatch(authUserWithToken({ accessToken }))
    dispatch(getUserInfo())
    dispatch(unSetLoading())
  } catch (err) {
    dispatch(unSetLoading())
    dispatch(setResetPasswordErrors({ email: err.response.data.message }))
  }
}
