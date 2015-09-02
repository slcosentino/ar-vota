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
  usuario.email = req.body.email;
  usuario.esCiudadano = req.body.esCiudadano;
  usuario.fechaCreacion = req.body.fechaCreacion;
  usuario.admin = req.body.admin;
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

router.get('/', authentication.isLoggedInAdmin, function(req, res, next) {
  Usuario.find(function(err, usuarios) {
    if (!err) {
      res.json(usuarios);
    } else {
      return next(err);
    }
  });
});

router.get('/:id_usuario', authentication.isLoggedIn, function(req, res, next) {
  var id_usuario = req.params.id_usuario;
 
  Usuario.findOne({id_usuario: id_usuario},'-password -__v', function(err, usuario) {
    if (!err) {
      res.json(usuario);
    } else {
      return next(err);
    }
  });
});

router.put('/:id_usuario', authentication.isLoggedIn, function(req, res, next) {
  var id_usuario = req.params.id_usuario;

  if (!req.user.admin) {
    if (!req.user.id_usuario === id_usuario) {
      res.status(403).json({message: 'No tiene autorización'});
    }
  }

  Usuario.findOneAndUpdate({id_usuario: id_usuario},  req.body, function(err, usuario) {
    if (!err) {
      usuario = usuario.toObject();
      delete usuario['password'];
      delete usuario['__v'];

      res.json(usuario);
    } else {
      console.log(err);
      return next(err);
    }
  });
});

module.exports = router;
