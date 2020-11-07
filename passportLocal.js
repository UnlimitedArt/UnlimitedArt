const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { use } = require("passport");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    console.log("pass auth user =>", email, password);
    try {
      let user = await getUserByEmail(email);
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
  passport.use('local',
    new LocalStrategy(
      { usernameField: "Email", passwordField: "password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await getUserById(id);
      console.log(user);
      delete user.password;
      return done(null, user);
    } catch (err) {
      console.log({ err });
    }
  });
}

module.exports = initialize;
