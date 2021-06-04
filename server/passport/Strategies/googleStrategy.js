const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../db/models/user");

const strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/drops-of-wisdom",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ username: profile.emails[0].value, googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
);

module.exports = strategy;



