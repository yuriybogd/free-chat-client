import React from "react"
import { useHistory } from "react-router-dom";
import {withRouter} from "react-router-dom"
import makeToast from "../Toaster"
import axios from "axios"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Копирайт © "}
        <Link color="inherit" href="/login">
          Free Chat
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
        theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const LoginPage = (props) => {
  const classes = useStyles()

  const history = useHistory()

  const emailRef = React.createRef()
  const passwordRef = React.createRef()

  const loginUser = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      })
      makeToast("success", response.data.message)
      localStorage.setItem("CC_Token", response.data.token)
      console.log("This is login's history", history)
      history.push("/dashboard")
      props.setupSocket()
    } catch (err) {
      if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
      )
        makeToast("error", err.response.data.message)
    }
  }

  return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline/>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Вход
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  placeholder="yourEmail@mail.ru"
                  inputRef={emailRef}
                  autoFocus
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Введите пароль"
                  inputRef={passwordRef}
              />
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary"/>}
                  label="Запомнить меня"
              />
              <Button
                  onClick={loginUser}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
              >
                Войти
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"У вас еще нет аккаунта? Зарегестрироваться"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright/>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
  )
}


export default withRouter(LoginPage)