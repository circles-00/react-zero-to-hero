import axios from 'axios'
import { apiPaths } from '../../constants/api.paths'
import { setLoading, unSetLoading } from '../feedback/actions'
import { SET_CHALLENGES } from './action.types'

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
