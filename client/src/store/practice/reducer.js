import { commonStateEnum } from '../../constants/state.enum'
import { SET_CHALLENGES, SET_IS_ANSWER_CORRECT } from './action.types'

const initialState = {
  challenges: commonStateEnum.INITIAL_STATE,
  isAnswerCorrect: commonStateEnum.INITIAL_STATE,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHALLENGES:
      return {
        ...state,
        challenges: action.payload,
      }

    case SET_IS_ANSWER_CORRECT:
      return {
        ...state,
        isAnswerCorrect: action.payload,
      }

    default:
      return state
  }
}

export default reducer
