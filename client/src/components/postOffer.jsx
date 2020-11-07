import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [selectedFiles,setfile]= useState([]); 

  const onFilesChange = function(e) {
    console.log("file",selectedFiles);
    let files = e.target.files;
    let arr = [];
    for (let i = 0; i < files.length; i++) {
      let file = e.target.files[i];
      arr.push(file);
    }
   setfile(arr)
  }

 const handleSubmit= function(e) {
    e.preventDefault();
      const data = new FormData();
      data.append(
        "file",
        selectedFiles[0],
        selectedFiles[0].name
      );
      console.log("selected file => ",selectedFiles);
      axios
        .post("/api/imgsrc", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((res) => {
          console.log("res => ", res);
        })
        .catch((e) => {
          console.log(e);
        });
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Jobtitle"
            label="Jobtitle"
            name="Jobtitle"
            autoComplete="Jobtitle"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Budget"
            label="Budget"
            type="Number"
            id="password"
            autoComplete="Budget"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Jobdescription"
            label="Jobdescription"
            type="text"
            id="Jobdescription"
            autoComplete="Jobdescription"
            height="100px"
          />

           <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    multiple
    style={{ display: "none" }}
    onChange={onFilesChange}
  />
</Button>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </form>
      </div>

    </Container>
  );
}