import {
  SET_IS_COMPONENT_LOADING,
  SET_IS_LOADING_FALSE,
  SET_IS_LOADING_TRUE,
} from './action.types'

export const setLoading = () => ({
  type: SET_IS_LOADING_TRUE,
})

export const unSetLoading = () => ({
  type: SET_IS_LOADING_FALSE,
})

export const setIsComponentLoading = (payload) => ({
  type: SET_IS_COMPONENT_LOADING,
  payload,
})
