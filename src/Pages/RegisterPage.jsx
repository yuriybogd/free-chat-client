import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
import RegisterSteps from "../components/RegisterSteps"
import Paper from "@material-ui/core/Paper"

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

}))

const RegisterPage = () => {
  const classes = useStyles()

  return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline/>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <RegisterSteps />
        </Grid>
      </Grid>
  )

}

export default RegisterPage
