import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import SelectField from "../Elements/FreelancerField.jsx";
import Footer from "../Footer.jsx";
import {connect} from "react-redux"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
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
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setrepass] = useState("");
  const [Username, setUsername] = useState("");
  const [Gender, setGender] = useState("");
  const [Age, setAge] = useState(null);
  const [City, setCity] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Field, setField] = useState("");
  const classes = useStyles();
  const handleChange = function (e) {
    console.log(e.target.name);
    var Labels = {
      Email: setEmail,
      password: setPassword,
      repass: setrepass,
      Username: setUsername,
      Gender: setGender,
      Age: setAge,
      City: setCity,
      Adresse: setAdresse,
      Field: setField,
    };
    Labels[e.target.name](e.target.value);
  };
  const field = function (field) {
    setField = field;
  };
  const signup = function (e) {
    e.preventDefault();
    let freelancerData = {
      Username: Username,
      Email: Email,
      password: password,
      Gender: Gender,
      Age: Age,
      City: City,
      Adresse: Adresse,
      Field: Field,
      type: "freelancer",
    };
    if (password === repass) {
      axios
        .post("/register", freelancerData)
        .then((data) => {
          console.log(data);
          if (data.data.Signup) {
            props.history.push("/FreelancerLogin");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Check password");
    }
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
            Freelancer Sign In
          </Typography>
          <form className={classes.form} onSubmit={signup} noValidate>
            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="email"
              autoFocus
            />

            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="Email"
              autoComplete="email"
              autoFocus
            />
            <div id="FlexSignup">
              <TextField
                onChange={handleChange}
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

              <TextField
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="repass"
                label="password Again"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </div>

            <div id="FlexSignup">
              <TextField
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="City"
                label="city"
                type="city"
                id="city"
                autoComplete="city"
              />

              <TextField
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Adresse"
                label="adress"
                type="adress"
                id="adress"
                autoComplete="adress"
              />
            </div>

            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Age"
              label="Age"
              type="number"
              id="Age"
            />
            <SelectField onChange={setField} />
            <FormControlLabel
              onChange={handleChange}
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
              Freelancer Sign In
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
        </div>
      </Grid>
      <Footer />
    </Grid>
  );
}));
