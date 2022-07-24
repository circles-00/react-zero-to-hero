import { applyMiddleware, createStore, compose } from 'redux'
import { rootReducer } from './rootReducer'
import thunk from 'redux-thunk'

const reduxDevToolsCompose =
  typeof window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] !== 'undefined'
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    : compose

const middlewares = [thunk]
const composeMethod =
  process.env.NODE_ENV === 'development' ? reduxDevToolsCompose : compose

const composedEnhancers = composeMethod(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, {}, composedEnhancers)
