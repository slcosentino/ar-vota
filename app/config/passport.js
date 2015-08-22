var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('../models/UsuarioSchema');

module.exports = function(passport) {
  passport.serializeUser(function(usuario, done) {
    done(null, usuario.id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id, '-password -__v',function(err, usuario) {
      done(err, usuario);
    })
  });

  passport.use(new LocalStrategy({
    usernameField: 'id_usuario',
    passwordField: 'password'
  }, function(id_usuario, password, done) {
    process.nextTick(function() {
      Usuario.findOne({
        'id_usuario': id_usuario,
      }, function(err, usuario) {
        if (err) {
          return done(err);
        }
        if (!usuario) {
          return done(null, false);
        }
        if (!usuario.checkPassword(password)) {
          return done(null, false);
        }
        return done(null, usuario);
      });
    });
  }));
};
