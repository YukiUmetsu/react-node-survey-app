/**
 * Created by yukiX on 2018/02/25.
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');



const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user=>{done(null, user)});
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done)=>{
        User.findOne({googleId: profile.id}).then(existingUser => {
            if(existingUser){
                // passport done function
                done(null, existingUser);
            } else {
                // create user in mongoDB
                new User({
                    googleId: profile.id,
                    lastName: profile.name.familyName,
                    firstName: profile.name.givenName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value
                })
                    .save()
                    .then(user=> done(null, user))
                    .catch(error=>done(error, null));
            }
        });
    })
);