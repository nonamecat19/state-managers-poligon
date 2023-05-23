import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducer"
import {Actions, State} from "./types"
import thunk from "redux-thunk"
import logger from 'redux-logger'

const store = createStore<State, Actions, unknown, unknown>(rootReducer, applyMiddleware(thunk, logger))

export default store;