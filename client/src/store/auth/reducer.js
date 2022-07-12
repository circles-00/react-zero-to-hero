import {
  SET_AUTH_ERRORS,
  SET_IS_AUTHENTICATED,
  SET_NOT_AUTHENTICATED,
  SET_RESET_PASSWORD_ERRORS,
  SET_USER_INFO,
} from './action.types'
import { commonStateEnum } from '../../constants/state.enum'

const initialState = {
  isAuthenticated: commonStateEnum.INITIAL_STATE,
  userInfo: {},
  errors: {},
  resetPasswordErrors: commonStateEnum.INITIAL_STATE,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: commonStateEnum.TRUE,
      }

    case SET_NOT_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: commonStateEnum.FALSE,
        userInfo: {},
      }

    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      }

    case SET_AUTH_ERRORS:
      return {
        ...state,
        errors: action.payload,
      }

    case SET_RESET_PASSWORD_ERRORS:
      return {
        ...state,
        resetPasswordErrors: action.payload,
      }

    default:
      return state
  }
}

export default reducer
