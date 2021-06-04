const express = require("express");
const router = express.Router();
const User = require("../db/models/user");
const passport = require("../passport");

router.get("/google",
    passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/google/drops-of-wisdom",
    passport.authenticate("google", {failureRedirect: "/login"}),
    function(req, res){
        res.redirect("../../secrets");
});

router.get("/facebook",
    passport.authenticate("facebook", {scope: ["email"]}));

router.get("/facebook/drops-of-wisdom",
    passport.authenticate("facebook", {failureRedirect: "/login"}),
    function(req, res){
        res.redirect("../../secrets");
});

router.get("/github",
    passport.authenticate("github"));

router.get("/github/drops-of-wisdom",
    passport.authenticate("github", {failureRedirect: "/login"}),
    function(req, res){
        res.redirect("../../secrets");
});

router.get("/login", function(req, res){
    res.render("login");
});
router.post("/login", function(req, res){

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err){
        if (err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("../../secrets");
            });
        }
    });

});

router.get("/register", function(req, res){
    res.render("register");
});
router.post("/register", function(req, res){

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("../../secrets");
            });
        }
    });

});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;