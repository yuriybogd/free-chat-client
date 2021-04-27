import { combineReducers } from 'redux'


// Reducers
import chatroomReducer from "../src/features/chatroom/chatroomSlice"

export const rootReducer = combineReducers({
  chatroom: chatroomReducer
})