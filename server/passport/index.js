const passport = require("passport");
const GoogleStrategy = require("./Strategies/googleStrategy");
const FacebookStrategy = require("./Strategies/facebookStrategy");
const GitHubStrategy = require("./Strategies/githubStrategy");
const User = require("../db/models/user");

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(GoogleStrategy);
passport.use(FacebookStrategy);
passport.use(GitHubStrategy);

module.exports = passport;