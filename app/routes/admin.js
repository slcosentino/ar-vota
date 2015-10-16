var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Usuario = require('../models/UsuarioSchema');
var Encuesta = require('../models/EncuestaSchema');

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, usuario, info) {
    if (!usuario) {
      return res.status(401).json({message:'Nombre de usuario o password incorrecto'});
    }
    if (!usuario.admin) {
      return res.status(401).json({message:'No es admin'});
    }
    req.login(usuario, function(err) {
      if (err) {
        return next(err);
      }
      res.json({message:'Log in correcto'});
    })
  })(req, res, next);
});

router.post('/debug', function(req, res, next) {
  var usuario = new Usuario();
  usuario.id_usuario = req.body.id_usuario;
  if (req.body.password) {
      usuario.password = usuario.hashPassword(req.body.password);
  }
  usuario.admin = true;
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

router.get('/me', authentication.isLoggedIn, function(req, res, next) {
  res.json(req.user);
});

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/admin');
});

router.post('/envioMasivo', authentication.isLoggedInAdmin, function(req, res, next) {
  var id_encuesta = req.body.id_encuesta;

  Encuesta.findOne({_id: id_encuesta}, function(err, encuesta) {
    if (err) {
      res.status(400).json({message: 'No se encuentra la encuesta'});
    }

    var encuesta = encuesta.toObject();
    var titulo = encuesta['titulo'];
    var topico = encuesta['topico'];

    var bulk = Usuario.collection.initializeOrderedBulkOp();
    bulk.find({}).update({
      $addToSet: {
        encuestas: {
          id_encuesta: id_encuesta,
          titulo: titulo,
          topico: topico
        }
      }
    });

    bulk.execute();

    res.json({message: 'Encuesta enviada con exito'})
  });

});

module.exports = router;
