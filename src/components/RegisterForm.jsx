import React, {useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

const RegisterForm = () => {
  useEffect(() => {
    return () => {
      console.log(`Name: ${localStorage.getItem("register_name")} Email: ${localStorage.getItem("register_email")} Password: ${localStorage.getItem("register_password")}`)
    }
    //eslint-disable-next-line
  }, [])

  const handleBlurName = (e) => {
    localStorage.setItem("register_name", e.target.value)
  }

  const handleBlurEmail = (e) => {
    localStorage.setItem("register_email", e.target.value)
  }

  const handleBlurPassword = (e) => {
    localStorage.setItem("register_password", e.target.value)
  }

  return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Данные для регистрации
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Имя"
                name="name"
                autoComplete="Имя"
                placeholder="Введите имя"
                onChange={handleBlurName}
                autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                placeholder="Введите Email"
                onBlur={handleBlurEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Введите пароль"
                onBlur={handleBlurPassword}
            />
          </Grid>
        </Grid>
      </React.Fragment>
  )
}

export default RegisterForm