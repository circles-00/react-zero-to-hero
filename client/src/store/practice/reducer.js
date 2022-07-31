import { commonStateEnum } from '../../constants/state.enum'
import { SET_CHALLENGES } from './action.types'

const initialState = {
  challenges: commonStateEnum.INITIAL_STATE,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHALLENGES:
      return {
        ...state,
        challenges: action.payload,
      }

    default:
      return state
  }
}

export default reducer
