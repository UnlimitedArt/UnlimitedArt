
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import  { useState } from 'react';
import axios from "axios"
import {connect} from "react-redux"
import { withRouter } from "react-router";
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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

const mapStateToProps = (state, ownProps) => {
  return {
    
    user:state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (value) => dispatch({
      type: 'updatedata',
      value
    })
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(function SignInSide(props) {
  const [Email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles();
  
const Login = function (event) {
  event.preventDefault();
  console.log(Email, password);
                axios({
                    url: '/ClientLogin',
                    method: 'POST',
                    data: {
                        Email:Email,
                        password:password
                    }
                }).then(data => {
                    console.log("data => ", data)
                    if(!data.data.Login){
                        alert("Check Again")
                        console.log(data);
                    }else{
                      props.history.push("/");
                      props.change("client")
                      props.update(data.data.user)
                    
                        }
                    
                }).catch(err => console.log(err))
             
        };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Client Login
          </Typography>
          <form className={classes.form} onSubmit={Login} noValidate>
            <TextField
              onChange={e=>{
                setEmail(e.target.value)
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email Address"
              name="Email"
              autoComplete="Email"
              autoFocus
            />
            <TextField
            onChange={e=>{
              setPassword(e.target.value)
            }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          {/* <form action="api/auth/google" method="POST">
            <input type="submit" value="USE google"/>
          </form> */}
        </div>
      </Grid>
    </Grid>
  );
}));




 
