const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { use } = require("passport");

function initialize(passport, getFreelancerByEmail, getFreelancerById) {
  const authenticateFreelancer = async (email, password, done) => {
    console.log("pass client auth user =>", email, password);
    try {
      let user = await getFreelancerByEmail(email);
      if (user == null) {
        return done(null, false, { message: "Username or Email not exist." });
      }

      if (await bcrypt.compare(password, user.password)) {
        delete user.password;

        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use("freelancer",
    new LocalStrategy(
      { usernameField: "Email", passwordField: "password" },
      authenticateFreelancer
    )
  );
  passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await getFreelancerById(id);
      console.log(user);
      delete user.password;
      return done(null, user);
    } catch (err) {
      console.log({ err });
    }
  });
}

module.exports = initialize;
