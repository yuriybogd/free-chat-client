import React, { createRef, useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { NavLink } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" >
        Your Website
      </Link >{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography >
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const DashboardPage = () => {
  const classes = useStyles()
  const chatroomNameRef = createRef()
  const [chatroomName, setChatroomName] = useState('')
  const [btnAddStatus, setBtnAddStatus] = useState(true)
  const [chatrooms, setChatrooms] = React.useState([])

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('CC_Token'),
    },
  }

  const getChatrooms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/chatroom', config)
      setChatrooms(response.data)
    } catch (e) {
      setTimeout(getChatrooms, 3000)
      throw(e)
    }
  }

  const addChatroom = async () => {
    try {
      const response = await axios.post('http://localhost:8000/chatroom', {
        name: chatroomName,
      }, config)

      console.log(response)
      console.log('[Chatroom created!]')
      chatroomNameRef.current.value = ''
      setBtnAddStatus(true)
    } catch (e) {
      throw e
    }
  }

  const handleChatroomName = (e) => {
    if (e.target.value) {
      setChatroomName(e.target.value)
      setBtnAddStatus(false)
    } else {
      setBtnAddStatus(true)
    }
    console.log('Current name', chatroomName)
  }

  React.useEffect(() => {
    getChatrooms()

    chatrooms.map(chatroom => {
      console.log(`Chatroom name ${chatroom.name} id ${chatroom._id}`)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment >
      <CssBaseline />
      <main >
        {/* Hero unit */}
        <div className={classes.heroContent} >
          <Container maxWidth="sm" >
            <Typography component="h1" variant="h2" align="center"
                        color="textPrimary" gutterBottom >
              Создать группу
            </Typography >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="chatroomName"
              label="Название группы"
              name="chatroomName"
              autoComplete="Введите название группы"
              placeholder="Введите название группы"
              onChange={handleChatroomName}
              inputRef={chatroomNameRef}
              autoFocus
            />
            <div className={classes.heroButtons} >
              <Grid container spacing={2} justify="center" >
                <Grid item >
                  <Button variant="contained" color="primary"
                          disabled={btnAddStatus} onClick={addChatroom} >
                    Создать группу
                  </Button >
                </Grid >
              </Grid >
            </div >
          </Container >
        </div >
        <Container className={classes.cardGrid} maxWidth="md" >
          {/* End hero unit */}
          <Grid container spacing={4} >
            {chatrooms.map((chatroom) => (
              <Grid item key={chatroom._id} xs={12} sm={6} md={4} >
                <Card className={classes.card} >
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent} >
                    <Typography gutterBottom variant="h5" component="h2" >
                      {chatroom.name}
                    </Typography >
                    <Typography >
                      This is a media card. You can use this section to
                      describe
                      the content.
                    </Typography >
                  </CardContent >
                  <CardActions >
                    <NavLink to={'/chatroom/' + chatroom._id} >
                      <Link
                        size="small"
                        color="primary" component={Button}
                      >
                        Войти
                      </Link >
                    </NavLink >

                    <Button size="small" color="primary" >
                      Добавить в избранное
                    </Button >
                  </CardActions >
                </Card >
              </Grid >
            ))}
          </Grid >
        </Container >
      </main >
      {/* Footer */}
      <footer className={classes.footer} >
        <Typography variant="h6" align="center" gutterBottom >
          Footer
        </Typography >
        <Typography variant="subtitle1" align="center" color="textSecondary"
                    component="p" >
          Something here to give the footer a purpose!
        </Typography >
        <Copyright />
      </footer >
      {/* End footer */}
    </React.Fragment >
  )
}

export default DashboardPage
