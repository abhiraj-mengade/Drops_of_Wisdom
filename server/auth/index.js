const express = require("express");
const router = express.Router();
const User = require("../db/models/user");
const passport = require("../passport");

router.get("/google",
    passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/google/drops-of-wisdom",
    passport.authenticate("google", {failureRedirect: "/login"}),
    (req, res) => {
        res.redirect("/");
});

router.get("/facebook",
    passport.authenticate("facebook", {scope: ["email"]}));

router.get("/facebook/drops-of-wisdom",
    passport.authenticate("facebook", {failureRedirect: "/login"}),
    (req, res) => {
        res.redirect("/");
});

router.get("/github",
    passport.authenticate("github"));

router.get("/github/drops-of-wisdom",
    passport.authenticate("github", {failureRedirect: "/login"}),
    (req, res) => {
        res.redirect("/");
});

router.get('/user', (req, res) => {
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

// router.get("/login", (req, res){
//     res.render("login");
// });
router.post("/login", (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (err){
            // console.log(err);
            return res.json({ user: null, error: err });
        }
        else{
            passport.authenticate("local")(req, res, () => {
                // res.redirect("../../secrets");
                return res.json({ user: req.user, error: null });
            });
        }
    });

});

// router.get("/register", (req, res){
//     res.render("register");
// });

router.post("/register", (req, res) => {

    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err){
            console.log(err);
            return res.json({ user: null, error: err });
        }
        else{
            passport.authenticate("local")(req, res, () => {
                // res.redirect("../../secrets");
                return res.json({ user: user, error: null })
            });
        }
    });

});

router.get("/logout", (req, res) => {
    if (req.user) {
        req.logout();
        return res.json({ error: null });
    } else {
        return res.json({error: "No user to log out!"});
    }
    // res.redirect("/");
});

module.exports = router;