const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // validate username
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        // validate password
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword) {
            done(null, user, req.flash('success', 'Welcome' + user.username));
        }
        else{
            done(null, false, req.flash('message', 'Incorrect password'));
        }
    }
    else{
        return done(null, false, req.flash('message', 'Username does not exists'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.idUser = result.insertId;
    return done(null, newUser);
}));

// save user in session
passport.serializeUser((user, done) => {
    done(null, user.idUser);
});

passport.deserializeUser(async(idUser, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE idUser = ?', [idUser]);
    done(null, rows[0]);
});