import { INVALIDATE_LESSONS, SET_LESSONS } from './action.types'
import { commonStateEnum } from '../../constants/state.enum'

const initialState = {
  lessons: commonStateEnum.INITIAL_STATE,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
      }
    case INVALIDATE_LESSONS:
      return {
        ...state,
        lessons: commonStateEnum.INITIAL_STATE,
      }
    default:
      return state
  }
}

export default reducer
