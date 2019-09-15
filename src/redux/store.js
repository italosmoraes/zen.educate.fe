import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers"

const middlewares = [thunk]

const createStoreWrapper = compose(
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)

const store = createStoreWrapper(reducers)

export default store
