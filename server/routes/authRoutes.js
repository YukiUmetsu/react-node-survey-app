/**
 * Created by yukiX on 2018/02/25.
 */

const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    app.get('/auth/google/callback', passport.authenticate('google'));
    app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    });
    app.get('/api/logout', (req,res)=>{
        // passport attaches logout function
        req.logout();
        res.send(req.user);
    })
};

