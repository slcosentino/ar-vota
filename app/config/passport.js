var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('../models/UsuarioSchema');

module.exports = function(passport) {
  passport.serializeUser(function(usuario, done) {
    done(null, usuario.id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id, '-Password -__v',function(err, usuario) {
      done(err, usuario);
    })
  });

  passport.use(new LocalStrategy({
    usernameField: 'Id_Usuario',
    passwordField: 'Password'
  }, function(Id_Usuario, Password, done) {
    process.nextTick(function() {
      Usuario.findOne({
        'Id_Usuario': Id_Usuario,
      }, function(err, usuario) {
        if (err) {
          return done(err);
        }
        if (!usuario) {
          return done(null, false);
        }
        if (!usuario.checkPassword(Password)) {
          return done(null, false);
        }
        return done(null, usuario);
      });
    });
  }));
};
