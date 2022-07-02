import { SET_IS_LOADING_FALSE, SET_IS_LOADING_TRUE } from './action.types'
import { commonStateEnum } from '../../constants/state.enum'

const initialState = {
  isLoading: commonStateEnum.INITIAL_STATE,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_TRUE:
      return {
        ...state,
        isLoading: commonStateEnum.TRUE,
      }
  case SET_IS_LOADING_FALSE:
    return {
      ...state,
      isLoading: commonStateEnum.FALSE,
    }
    default:
      return state
  }
}

export default reducer
