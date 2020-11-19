var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, userid, password, done) {
    if (userid == 'hello' && password == 'world') {
        var user = {
            'userid': 'hello',
            'email': 'hello@world.com'
        };
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

passport.serializeUser(function(user, done) {
    console.log('serialize');
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    //findById(id, function (err, user) {
    console.log('deserialize');
    done(null, user);
    //});
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Oauth Login' });
});
router.post('/', passport.authenticate('local', { failureRedirect: '/login/fail', failureFlash: true }),
    function(req, res) {
        res.redirect('/login/success');
    });
router.get('/success', function(req, res) {
    console.log('success');
    console.log(req.user);
    res.send(req.user);
});

router.get('/fail', function(req, res, next) {
    console.log('fail');
    res.send('login fail');
});
module.exports = router;