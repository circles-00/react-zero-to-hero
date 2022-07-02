import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import feedbackReducer from './feedback/reducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  feedback: feedbackReducer
})
