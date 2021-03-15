import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import {getBase64} from "../utilities/imageToBase64"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
        theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 320,
    width: 480,
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1)
  }
}))

export default function AvatarForm() {
  const classes = useStyles()

  const handleOnChangeAvatarImage = async e => {
    const file = e.target.files[0]

    try {
      const base64 = await getBase64(file)
      localStorage.setItem("avatarStringType", base64)
      console.log("This is avatar image in String type: ", typeof(base64) )
    } catch (e) {
      throw e
    }
  }

  return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Фотография профиля
        </Typography>
        <Grid
            container
            spacing={2}
            className={classes.root}>
          <Grid item xs={12} className={classes.image}>

          </Grid>
          <Grid container direction="column" alignItems="center" item xs={12} className={classes.upload}>
            <input
                accept="image/*"
                className={classes.input}
                id="upload"
                multiple
                type="file"
                onChange={handleOnChangeAvatarImage}
            />
            <label htmlFor="upload">
              <Button variant="contained" color="default" component="span" className={classes.button}
                      startIcon={<CloudUploadIcon/>}>
                Загрузить
              </Button>
            </label>
          </Grid>
        </Grid>
      </React.Fragment>


  )
}