const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../Utils/passport");
const {
  registerUser,
  loginUser,
  logoutUser,
  authSuccess
} = require("../controllers/auth.controller");

// Routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/success",authSuccess);


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.frontend_url}/dashboard`);
  }
);


router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    
    res.redirect(`${process.env.frontend_url}/dashboard`);
  }
);


router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {

  res.redirect(`${process.env.frontend_url}/dashboard`);
});

module.exports = router;
