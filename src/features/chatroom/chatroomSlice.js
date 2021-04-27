import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpenDialog: false,
  isAgreeDialog: false,
}

// Async Thunks
export const sendMsg = createAsyncThunk('chatroom/sendMsg',
  async ({ match, socket, msg }) => {
    const chatroomId = match.params.id

    if (socket) {
      socket.emit('chatroomMessage', {
        chatroomId,
        message: msg,
      })
    }
  },
)

// Slice
const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState,
  reducers: {
    openDialog: (state) => {state.isOpenDialog = true},
    agreeWithBadWords: (state) => {
      state.isAgreeDialog = true
      state.isOpenDialog = false
    },
    disagreeWithBadWords: (state) => {
      state.isAgreeDialog = false
      state.isOpenDialog = false
    },
  },
})

// Selectors
export const selectIsOpenDialog = (state) => state.chatroom.isOpenDialog
export const selectIsAgreeDialog = (state) => state.chatroom.isAgreeDialog

export const {
  openDialog,
  closeDialog,
  agreeWithBadWords,
  disagreeWithBadWords,
} = chatroomSlice.actions

export default chatroomSlice.reducer


