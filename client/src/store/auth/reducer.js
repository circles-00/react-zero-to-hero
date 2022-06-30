import isEmpty from 'lodash.isempty';
import {SET_AUTH_ERRORS, SET_IS_AUTHENTICATED, SET_NOT_AUTHENTICATED, SET_USER_INFO} from './actionTypes';


const initialState = {
  isAuthenticated: false,
  userInfo: {},
  errors: {}
};

export const reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
  case SET_IS_AUTHENTICATED:
    return {
      ...state,
      isAuthenticated: true,
      userInfo: !isEmpty(action.payload) ? state.userInfo : action.payload
    };

  case SET_NOT_AUTHENTICATED:
    return {
      ...state,
      isAuthenticated: false,
      userInfo: {}
    };

  case SET_USER_INFO:
    return {
      ...state,
      userInfo: action.payload
    };

  case SET_AUTH_ERRORS:
    return {
      ...state,
      errors: action.payload
    }

  default:
    return state;
  }
};

export default reducer;
