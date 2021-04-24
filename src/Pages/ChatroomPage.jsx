import React from 'react'
import { withRouter } from 'react-router'
import { Container, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  chatroomPage: {
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  margin: "-8px",
},
chatroomSection: {
  width: "40vw",
  height: "80vh",
  margin: "auto",
  border: "1px solid #eee",
  position: "relative",
},
chatroomContent: {
  position: "absolute",
  top: "2.5rem",
  left: "0",
  right: "0",
  bottom: "3.5rem",
  padding: "0.5rem",
  overflow: "auto",
},
chatroomActions: {
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  padding: "0.5rem",
  display: "grid",
  gridTemplateColumns: "1fr 72px",
  gridGap: "1rem",
  borderTop: "1px solid #eee",
},
// chatroomActions.button: {
//   height: "100%",
// },
message: {
  marginBottom: "0.25rem",
},
otherMessage: {
  color: "#0099cc",
  fontWeight: "bold",
},
ownMessage: {
  color: "#00cc00",
  fontWeight: "bold",
},
}))

const ChatroomPage = ({ match, socket }) => {
  const classes = useStyles()

  const chatroomId = match.params.id
  const [messages, setMessages] = React.useState([])
  const messageRef = React.useRef()
  const [userId, setUserId] = React.useState('')

  const sendMessage = () => {
    if (socket) {
      socket.emit('chatroomMessage', {
        chatroomId,
        message: messageRef.current.value,
      })

      messageRef.current.value = ''
    }
  }

  React.useEffect(() => {
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
    <div className={classes.chatroomPage}>
      <div className={classes.chatroomSection}>
        <div className={classes.cardHeader}>Chatroom Name</div>
        <div className={classes.chatroomContent}>
          {messages.map((message, i) => (
            <div key={i} className={classes.message}>
              <span
                className={
                  userId === message.userId ? classes.ownMessage : classes.otherMessage
                }
              >
                {message.name}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className={classes.chatroomActions}>
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className={classes.join} onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChatroomPage)
