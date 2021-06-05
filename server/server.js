require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const dbConnection = require("./db");
const passport = require("./passport");
const User = require("./db/models/user");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const GitHubStrategy = require("passport-github2").Strategy;
// const findOrCreate = require("mongoose-findorcreate");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.APP_SECRET || "Our little secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));
app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     googleId: String,
//     facebookId: String,
//     githubId: String,
//     secret: String
// });

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/drops-of-wisdom",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile);
//     User.findOrCreate({ username: profile.emails[0].value, googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/drops-of-wisdom",
//     profileFields: ['id', 'email']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ username: profile.emails[0].value, facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/github/drops-of-wisdom",
//     scope: ["user:email"]
//   },
//   function(accessToken, refreshToken, profile, done) {
//       console.log(profile);
//     User.findOrCreate({ username: profile.emails[0].value, githubId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

app.get("/", function(req, res){
    res.render("home");
});

app.use("/auth", require("./auth/index"))

// app.get("/auth/google",
//     passport.authenticate("google", {scope: ["profile", "email"]}));

// app.get("/auth/google/drops-of-wisdom",
//     passport.authenticate("google", {failureRedirect: "/login"}),
//     function(req, res){
//         res.redirect("/secrets");
// });

// app.get("/auth/facebook",
//     passport.authenticate("facebook", {scope: ["email"]}));

// app.get("/auth/facebook/drops-of-wisdom",
//     passport.authenticate("facebook", {failureRedirect: "/login"}),
//     function(req, res){
//         res.redirect("/secrets");
// });

// app.get("/auth/github",
//     passport.authenticate("github"));

// app.get("/auth/github/drops-of-wisdom",
//     passport.authenticate("github", {failureRedirect: "/login"}),
//     function(req, res){
//         res.redirect("/secrets");
// });

// app.get("/login", function(req, res){
//     res.render("login");
// });
// app.post("/login", function(req, res){

//     const user = new User({
//         username: req.body.username,
//         password: req.body.password
//     });
//     req.login(user, function(err){
//         if (err){
//             console.log(err);
//         }
//         else{
//             passport.authenticate("local")(req, res, function(){
//                 res.redirect("/secrets");
//             });
//         }
//     });

// });

// app.get("/register", function(req, res){
//     res.render("register");
// });
// app.post("/register", function(req, res){

//     User.register({username: req.body.username}, req.body.password, function(err, user){
//         if (err){
//             console.log(err);
//             res.redirect("/register");
//         }
//         else{
//             passport.authenticate("local")(req, res, function(){
//                 res.redirect("/secrets");
//             });
//         }
//     });

// });

app.get("/secrets", function(req, res){
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
        if (err){
            console.log(err);
        }
        else{
            if(foundUsers){
                res.render("secrets", {usersWithSecrets: foundUsers});
            }
        }
    });
});

app.get("/submit", function(req, res){
    if (req.isAuthenticated()){
        res.render("submit");
    }
    else{
        res.redirect("/auth/login");
    }
});

app.post("/submit", function(req, res){
    User.findById(req.user.id, function(err, foundUser){
        if (err){
            console.log(err);
        }
        else{
            if(foundUser){
                foundUser.secret = req.body.secret;
                foundUser.save(function(){
                    res.redirect("/secrets");
                });
            }
        }
    });
});

// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });


app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`);
});
