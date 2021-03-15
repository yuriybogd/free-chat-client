import React, {useEffect} from "react"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Autocomplete from '@material-ui/lab/Autocomplete'
import {russianCities} from "../common/russianCities"


export default function AboutForm() {

  useEffect(() => {
    return () => {
      console.log(`About: ${localStorage.getItem('register_about')} City: ${localStorage.getItem('register_city')} `)
    }
    //eslint-disable-next-line
  }, [])


  const handleBlurAbout = (e) => {
    localStorage.setItem("register_about", e.target.value)
  }

  const handleBlurCity = (e) => {
    localStorage.setItem("register_city", e.target.value)
  }

 return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Информация о себе
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
                id="about"
                label="О себе"
                placeholder="Расскажите о себе"
                fullWidth
                multiline
                onBlur={handleBlurAbout}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
                options={russianCities.map(option => option.city)}
                id="city"
                clearOnEscape
                renderInput={(params) => <TextField
                    {...params}
                    label="Город"
                    margin="normal"
                    onBlur={handleBlurCity}
                />}
            />
          </Grid>
        </Grid>
      </React.Fragment>
  )
}

