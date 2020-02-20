import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { todoReducer } from './reducers.js'

export const store = createStore(todoReducer, applyMiddleware(thunk))