const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/userModel');

  passport.use(
    new GoogleStrategy(
      {
        clientID:process.env.client_id,
        clientSecret:process.env.client_secret,
        callbackURL: `${process.env.backend_url}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
          let user = await User.findOne({ googleId: profile.id });
          
          if (!user) {
            user = await User.create({
              googleId:profile.id,
              username:profile.displayName,
              image:profile.photos[0].value,
            })
          }

          return done(null, user);

        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID:process.env.github_id,
        clientSecret:process.env.github_secret,
        callbackURL: `${process.env.backend_url}/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)

        try {
        
          let user = await User.findOne({ githubId: profile.id });
  
          if (!user) {

            user = await User.create({
              githubId: profile.id,
              username: profile.username,
              image:profile.photos[0].value,
             
            });
          }
  
        
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID:process.env.facebook_id,
        clientSecret:process.env.facebook_secret,
        callbackURL: `${process.env.backend_url}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
         
          console.log(profile)
          let user = await User.findOne({ facebookId: profile.id });
      
          if (!user) {
          
            user = await User.create({
              facebookId: profile.id,
              username:profile.displayName,
              image:profile.photos[0].value,
            });
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
