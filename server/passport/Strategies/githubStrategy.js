const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../../db/models/user");

const strategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/drops-of-wisdom",
    scope: ["user:email"]
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ username: profile.emails[0].value, githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
);

module.exports = strategy;