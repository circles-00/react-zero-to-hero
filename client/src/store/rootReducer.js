import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import feedbackReducer from './feedback/reducer'
import lessonsReducer from './lessons/reducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  feedback: feedbackReducer,
  lessons: lessonsReducer,
})
