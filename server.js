const express = require("express");
const { connection } = require("./Data-Base/database");
const PORT = 3000;
const app = express();
const clientRouter = require("./ServerRoutes/Client");
const FreelancerRouter = require("./ServerRoutes/FreeLancer");
const offersRouter = require("./ServerRoutes/offers");
const UsersRouter = require("./ServerRoutes/users");
const contactRouter = require("./ServerRoutes/contact");
const AdminRouter = require("./ServerRoutes/admin");
const imgsrc = require("./ServerRoutes/img");
const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use(express.json());
app.use(express.static(__dirname + "/client/dist"));
app.use(express.urlencoded({ extended: false }));

/*Routes*/

app.use("/api/imgsrc", imgsrc);
app.use("/api/clients", clientRouter);
app.use("/api/freeLancers", FreelancerRouter);
app.use("/api/offers", offersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/users", UsersRouter);
app.use("/api/Admin", AdminRouter);

/*Server Connection*/

/*/////////// for passport local login ///////////// */
const local = require("./Data-Base/client/passport");
const localFreelancer = require("./Data-Base/freelancer/passport");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use((req, res, next) => {
  next();
});
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const passportLocal = require("./passportLocal");
const passportFreelancer = require("./passportfreelancer")

  passportLocal(passport, local.getUserByEmail, local.getUserById);


  passportFreelancer(passport, localFreelancer.getFreelancerByEmail, localFreelancer.getFreelancerById);


app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
/*//////////////////////////////Passport For clients//////// */
app.get("/api/user", checkAuthenticated, (req, res) => {
  res.json({ user: req.user, Login: true });
});

app.get("/ClientLogin", checkNotAuthenticated, (req, res) => {
  res.render("/");
});
app.post("/ClientLogin", passport.authenticate("local"), function (req, res) {
  res.json({ user: req.user, Login: true, type:"client" });
});
app.post("/FreelancerLogin", passport.authenticate("freelancer"), function (req, res) {
  res.json({ user: req.user, Login: true, type:"freelancer" });
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("/");
});
app.post("/register", checkNotAuthenticated, async (req, res) => {
  let Data = {
    Username: req.body.Username,
    Email: req.body.Email,
    password: req.body.password,
    Age: req.body.Age,
    Gender: req.body.Gender,
    City: req.body.City,
    Adresse: req.body.Adresse,
    imgsrc: "",
    provider: "local",
    providerId: "",
  };

  try {
    if (req.body.type === "client") {
      let user = await local.save(Data);
      delete user.password;
      res.send({ user, Signup: true });
    } else {
      let user = await localFreelancer.saveFreelancer(Data);
      delete user.password;
      res.send({ user, Signup: true });
    }
  } catch (e) {
    if (req.body.type === "client") {
      console.log(e);
      res.redirect("/ClientSignup");
    } else {
      console.log(e);
      res.redirect("/FreelancerSignup");
    }
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/Clientlogin");
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

/*////////google passport///////// */
// Credentials for Google and Facebook Authentication
const credentials = require("./keys.js");
// Google Strategy
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.googleClientID,
      clientSecret: credentials.googleClientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      let googleUser = {
        ProviderId: profile.id,
        Provider: "google",
        Username: profile.displayName,
        Email: profile._json.email,
      };
      try {
        let user = await Client.findOne(googleUser);
        if (!!user) {
          return done(null, user);
        } else {
          let newUser = await Client.googleSave(googleUser);
          return newUser;
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
app.post(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    if (req.user) {
      console.log("hello my dear artist", req.user);
      res.send({ googleUser: req.user });
    }
  }
);
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/dist/index.html");
});
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
