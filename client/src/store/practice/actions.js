import axios from 'axios'
import { apiPaths } from '../../constants/api.paths'
import {
  setIsComponentLoading,
  setLoading,
  unSetLoading,
} from '../feedback/actions'
import { SET_CHALLENGES, SET_IS_ANSWER_CORRECT } from './action.types'
import { commonStateEnum } from '../../constants/state.enum'

export const setChallenges = (payload) => ({
  type: SET_CHALLENGES,
  payload,
})

export const fetchAllChallenges = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const { data } = await axios[apiPaths.challengesApi.method](
      apiPaths.challengesApi.path,
    )

    dispatch(setChallenges(data))
    dispatch(unSetLoading())
  } catch (err) {
    dispatch(unSetLoading())
  }
}

export const setIsAnswerCorrect = (payload) => ({
  type: SET_IS_ANSWER_CORRECT,
  payload,
})

export const checkAnswer = (questionId, answerId) => async (dispatch) => {
  try {
    dispatch(setIsComponentLoading(commonStateEnum.TRUE))
    const {
      data: { isAnswerCorrect },
    } = await axios[apiPaths.checkAnswerPracticeApi.method](
      apiPaths.checkAnswerPracticeApi.path,
      {
        questionId: questionId,
        answerId: answerId.toString(),
      },
    )
    dispatch(setIsAnswerCorrect(isAnswerCorrect))
    dispatch(setIsComponentLoading(commonStateEnum.INITIAL_STATE))
  } catch (err) {
    dispatch(setIsComponentLoading(commonStateEnum.INITIAL_STATE))
  }
}
