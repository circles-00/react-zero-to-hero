import { setLoading, unSetLoading } from '../feedback/actions'
import axios from 'axios'
import { apiPaths } from '../../constants/api.paths'
import { INVALIDATE_LESSONS, SET_LESSONS } from './action.types'

export const setLessons = (payload) => ({
  type: SET_LESSONS,
  payload,
})

export const invalidateLessonsState = () => ({
  type: INVALIDATE_LESSONS,
})

export const fetchLessons = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const { data: lessons } = await axios[apiPaths.fetchLessonsApi.method](
      apiPaths.fetchLessonsApi.path,
    )

    dispatch(setLessons(lessons))
    dispatch(unSetLoading())
  } catch (err) {
    dispatch(unSetLoading())
  }
}

export const markLessonAsDone = (lessonId) => async (dispatch) => {
  try {
    await axios[apiPaths.markLessonAsDone.method](
      apiPaths.markLessonAsDone.path,
      { lessonId },
    )
    dispatch(invalidateLessonsState())
    dispatch(fetchLessons())
  } catch (err) {
    dispatch(unSetLoading())
  }
}
