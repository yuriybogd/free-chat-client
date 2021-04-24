import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import RegisterForm from './RegisterForm'
import AboutForm from './AboutForm'
import makeToast from '../Toaster'
import axios from 'axios'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="/" >
        Free Chat
      </Link >{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography >
  )
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const steps = ['Заполните данные', 'Расскажите о себе']

function getStepContent (step) {
  switch (step) {
    case 0:
      return <RegisterForm />
    case 1:
      return <AboutForm />
    default:
      throw new Error('Unknown step')
  }
}

const RegisterSteps = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleSubmit = async () => {

    console.log('Props inside function handleSubmit  history:', props.history)

    const name = localStorage.getItem('register_name')
    const email = localStorage.getItem('register_email')
    const password = localStorage.getItem('register_password')
    const about = localStorage.getItem('register_about')
    const city = localStorage.getItem('register_city')

    localStorage.formState = JSON.stringify(
      { name, email, password, about, city })

    console.log('LocalStorage Form State: ', JSON.parse(localStorage.formState))

    try {
      const response = await axios.post('http://localhost:8000/user/register', {
          name, email, password, about, city,
        },
      )

      //remove current user's fields
      localStorage.removeItem('register_name')
      localStorage.removeItem('register_email')
      localStorage.removeItem('register_password')
      localStorage.removeItem('register_about')
      localStorage.removeItem('register_city')

      makeToast('success', response.data.message)
      history.push('/login')

    } catch (e) {
      if (e && e.response && e.response.data && e.response.data.message)
        makeToast('error', e.response.data.message)
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <React.Fragment >
      <CssBaseline />
      <main className={classes.layout} >
        <Paper className={classes.paper} >
          <Typography component="h1" variant="h5" >
            Регистрация
          </Typography >
          <Stepper activeStep={activeStep} className={classes.stepper} >
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel >{label}</StepLabel >
              </Step >
            ))}
          </Stepper >
          <React.Fragment >
            {activeStep === steps.length ? (
              <React.Fragment >
                <Typography variant="h5" gutterBottom >
                  Вы зарегестрированы!
                </Typography >
                <Typography variant="subtitle1" >
                  Добро пожаловать на наш бесплатный чат для общения. Где вы
                  можете создавать любые группы для
                  общения, делиться информацией с гостями нашего ресурса.
                  Будьте вежливы и получайте удовольствие!
                </Typography >
              </React.Fragment >
            ) : (
              <React.Fragment >
                {getStepContent(activeStep)}
                <div className={classes.buttons} >
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button} >
                      Назад
                    </Button >
                  )}
                  {
                    activeStep === steps.length - 1
                      ? <Button variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                className={classes.button} >Зарегестрироваться</Button >
                      : <Button variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button} >Далее</Button >
                  }
                </div >
              </React.Fragment >
            )}
          </React.Fragment >
        </Paper >
        <Copyright />
      </main >
    </React.Fragment >
  )
}

export default RegisterSteps