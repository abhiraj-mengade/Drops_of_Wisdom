const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../db/models/user");

const strategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/drops-of-wisdom",
    profileFields: ['id', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ username: profile.emails[0].value, facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
);

module.exports = strategy;