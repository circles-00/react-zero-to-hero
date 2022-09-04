import {
  setIsComponentLoading,
  setLoading,
  unSetLoading,
} from '../feedback/actions'
import axios from 'axios'
import { apiPaths } from '../../constants/api.paths'
import {
  SET_CERTIFICATION_DATA,
  SET_IS_CERTIFICATE_ANSWER_CORRECT,
} from './action.types'
import { certificationChallengePage } from '../../config/routes'
import { commonStateEnum } from '../../constants/state.enum'

export const setCertificationData = (payload) => ({
  type: SET_CERTIFICATION_DATA,
  payload,
})

export const setIsCertificateAnswerCorrect = (payload) => ({
  type: SET_IS_CERTIFICATE_ANSWER_CORRECT,
  payload,
})

export const getCertificationData = (history) => async (dispatch) => {
  try {
    dispatch(setIsComponentLoading(commonStateEnum.TRUE))
    const { data } = await axios[apiPaths.getCertificationDataApi.method](
      apiPaths.getCertificationDataApi.path,
    )
    dispatch(setCertificationData(data))
    dispatch(setIsComponentLoading(commonStateEnum.INITIAL_STATE))
    if (history !== undefined) history.push(certificationChallengePage.path)
  } catch (err) {
    dispatch(setIsComponentLoading(commonStateEnum.INITIAL_STATE))
  }
}

export const beginCertification = (history) => async (dispatch) => {
  try {
    dispatch(setLoading())
    await axios[apiPaths.beginCertificationApi.method](
      apiPaths.beginCertificationApi.path,
    )
    dispatch(unSetLoading())
    dispatch(getCertificationData(history))
  } catch (err) {
    dispatch(unSetLoading())
  }
}

export const checkIsAnswerCorrect =
  (questionId, answerId) => async (dispatch) => {
    try {
      dispatch(setLoading())
      const {
        data: { isAnswerCorrect },
      } = await axios[apiPaths.certCheckAnswerApi.method](
        apiPaths.certCheckAnswerApi.path,
        { questionId: questionId.toString(), answerId: answerId.toString() },
      )
      dispatch(setIsCertificateAnswerCorrect(isAnswerCorrect))
      dispatch(unSetLoading())
    } catch (err) {
      dispatch(unSetLoading())
    }
  }
