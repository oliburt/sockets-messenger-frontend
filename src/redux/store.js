import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userStore from './reducers/manageUser'
import chatroomsStore from './reducers/manageChatrooms'
import { composeWithDevTools } from 'redux-devtools-extension'



const rootReducer = combineReducers({userStore, chatroomsStore})

const middlewares = [thunk]
const composedMiddlewares = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(rootReducer, composedMiddlewares)

export default store