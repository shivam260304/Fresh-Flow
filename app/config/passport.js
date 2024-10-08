const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrategy({usernameField: 'email'},async (email, password, done) => {
      // Login
      // check if email exists
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = init;

// LocalStarategy -> fetching a user in USER COLLECTION by 'email', if all ok then ,
// serializeUser -> storing this user's id in the session
// deserialzeUser -> using this stored 'id' from the session and fetching
    //  the 'USER COLLECTION' and returning the mathing user which we can access with
      // req.user; which returns the whole user object
