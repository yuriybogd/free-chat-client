import React, { createRef, useState } from 'react'
import { withRouter } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { badWordsFilter } from '../utilities/badWordsFilter'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  agreeWithBadWords,
  disagreeWithBadWords,
  openDialog,
  selectIsAgreeDialog,
  selectIsOpenDialog,
} from '../features/chatroom/chatroomSlice'
import { sendMsg } from '../features/chatroom/chatroomSlice'

const useStyles = makeStyles(() => ({
  chatroomPage: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    margin: '-8px',
  },
  chatroomSection: {
    width: '40vw',
    height: '80vh',
    margin: 'auto',
    border: '1px solid #eee',
    position: 'relative',
  },
  chatroomContent: {
    position: 'absolute',
    top: '2.5rem',
    left: '0',
    right: '0',
    bottom: '3.5rem',
    padding: '0.5rem',
    overflow: 'auto',
  },
  chatroomActions: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '0.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr 72px',
    gridGap: '1rem',
    borderTop: '1px solid #eee',
  },
  // chatroomActions.button: {
  //   height: "100%",
  // },
  message: {
    marginBottom: '0.25rem',
  },
  otherMessage: {
    color: '#0099cc',
    fontWeight: 'bold',
  },
  ownMessage: {
    color: '#00cc00',
    fontWeight: 'bold',
  },
}))

const ChatroomPage = ({ match, socket }) => {
  const classes = useStyles()
  const chatroomId = match.params.id
  const [messages, setMessages] = useState([])
  const [userId, setUserId] = useState('')
  const isOpenDialog = useSelector(selectIsOpenDialog)
  const isAgreeDialog = useSelector(selectIsAgreeDialog)

  const msgRef = createRef()
  const dispatch = useDispatch()

  const sendMessage = () => {
    const msg = msgRef.current.value

    // Bad words filter
    if (!!badWordsFilter(localStorage.getItem('regexp'), msg) &&
      isAgreeDialog) {
      dispatch(sendMsg({ match, socket, msg }))
      dispatch(disagreeWithBadWords())
      msgRef.current.value = ''

    } else if (!!badWordsFilter(localStorage.getItem('regexp'), msg)) {
      dispatch(openDialog())

      if (isAgreeDialog) {
        console.log('Agree if statement, isAgreeDialog', isAgreeDialog)
        dispatch(sendMsg({ match, socket, msg }))
        msgRef.current.value = ''
      }

    } else {
      dispatch(sendMsg({ match, socket, msg }))
      msgRef.current.value = ''
    }
  }

  const getRussianBadWords = async () => {
    if (!localStorage.getItem('regexp')) {
      try {
        const response = await axios.get('http://localhost:3000/badWords.json')
        localStorage.setItem('regexp', response.data.russian)
        console.log('[loading...]')
      } catch (e) {
        throw e
      }
    }
  }

  React.useEffect(() => {
    getRussianBadWords()

    console.log('[render]')

    const token = localStorage.getItem('CC_Token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUserId(payload.id)
    }
    if (socket) {
      socket.on('newMessage', (message) => {
        const newMessages = [...messages, message]
        setMessages(newMessages)
      })
    }
    //eslint-disable-next-line
  }, [messages])

  React.useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {
        chatroomId,
      })
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', {
          chatroomId,
        })
      }
    }
    //eslint-disable-next-line
  }, [messages])

  return (
    <>
      <Dialog
        open={isOpenDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >{'Предупреждение!'}</DialogTitle >
        <DialogContent >
          <DialogContentText id="alert-dialog-description" >
            Вы уверены, что хотите отправить сообщение с нецензурной лексикой?
          </DialogContentText >
        </DialogContent >
        <DialogActions >
          <Button onClick={() => dispatch(disagreeWithBadWords())}
                  color="primary" >
            Нет, я интеллегент
          </Button >
          <Button onClick={() => dispatch(agreeWithBadWords())} color="primary"
                  autoFocus >
            Да, я ругаюсь
          </Button >
        </DialogActions >
      </Dialog >

      <div className={classes.chatroomPage} >
        <div className={classes.chatroomSection} >
          <div className={classes.cardHeader} >Chatroom Name</div >
          <div className={classes.chatroomContent} >
            {messages.map((message, i) => (
              <div key={i} className={classes.message} >
                <span
                  className={
                    userId === message.userId
                      ? classes.ownMessage
                      : classes.otherMessage
                  }
                >
                  {message.name}:
                </span >{' '}
                {message.message}
              </div >
            ))}
          </div >
          <div className={classes.chatroomActions} >
            <div >
              <input
                type="text"
                name="message"
                placeholder="Say something!"
                ref={msgRef}
              />
            </div >
            <div >
              <button onClick={sendMessage} >
                Send
              </button >
            </div >
          </div >
        </div >
      </div >
    </>
  )
}

export default withRouter(ChatroomPage)
