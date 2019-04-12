var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});
passport.use(
 new GoogleStrategy(
  {
   clientID: "73227905497-g1jsbc55qa6j567912ghdli5obhpkofd.apps.googleusercontent.com",
   clientSecret: "POyci7fwMnGArFLDbfAktroH",
   callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   var userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };
   done(null, userData);
  }
 )
);