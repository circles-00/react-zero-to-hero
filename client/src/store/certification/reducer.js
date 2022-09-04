import { commonStateEnum } from '../../constants/state.enum'
import {
  SET_CERTIFICATION_DATA,
  SET_IS_CERTIFICATE_ANSWER_CORRECT,
} from './action.types'

const initialState = {
  certificationData: commonStateEnum.INITIAL_STATE,
  isAnswerCorrect: commonStateEnum.INITIAL_STATE,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CERTIFICATION_DATA:
      return {
        ...state,
        certificationData: action.payload,
      }

    case SET_IS_CERTIFICATE_ANSWER_CORRECT:
      return {
        ...state,
        isAnswerCorrect: action.payload,
      }

    default:
      return state
  }
}

export default reducer
