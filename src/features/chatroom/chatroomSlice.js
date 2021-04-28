import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpenDialog: false,
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
    closeDialog: (state) => {state.isOpenDialog = false},

  },
})

// Selectors
export const selectIsOpenDialog = (state) => state.chatroom.isOpenDialog

export const {
  openDialog,
  closeDialog,
} = chatroomSlice.actions

export default chatroomSlice.reducer


