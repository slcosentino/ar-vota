var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Usuario = require('../models/UsuarioSchema');

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, usuario, info) {
    if (!usuario) {
      return res.status(401).json({message:'Nombre de usuario o password incorrecto'});
    }
    req.login(usuario, function(err) {
      if (err) {
        return next(err);
      }
      res.json({message:'Log in correcto'});
    })
  })(req, res, next);
});

router.post('/registro', function(req, res, next) {
  var usuario = new Usuario();
  usuario.id_usuario = req.body.id_usuario;
  if (req.body.password) {
      usuario.password = usuario.hashPassword(req.body.password);
  }
  usuario.nombre = req.body.nombre;
  usuario.apellido = req.body.apellido;
  usuario.save(function(err) {
    if (!err) {
      req.login(usuario, function(err) {
        if (!err) {
          res.json({message: 'Usuario registrado con exito'})
        }
      });
    } else {
      res.status(400).json({message: 'Verifique los campos'});
    }
  });
});

router.get('/perfil', authentication.isLoggedIn, function(req, res, next) {
  res.json(req.user);
});

module.exports = router;
