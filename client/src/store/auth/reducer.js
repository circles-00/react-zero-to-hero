import isEmpty from 'lodash.isempty';
import {SET_IS_AUTHENTICATED} from './actionTypes';


const initialState = {
  isAuthenticated: false,
};

export const reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
  case SET_IS_AUTHENTICATED:
    return {
      ...state,
      isAuthenticated: action.payload
    }

  default:
    return state;
  }
};

export default reducer
