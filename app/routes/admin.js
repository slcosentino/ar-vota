var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Usuario = require('../models/UsuarioSchema');
var Encuesta = require('../models/EncuestaSchema');
var Publicacion = require('../models/PublicacionSchema');
var SolicitudVerificacion = require('../models/SolicitudVerificacionSchema');

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

router.delete('/publicaciones', authentication.isLoggedInAdmin, function(req, res, next){
  Publicacion.findOneAndUpdate(
    {_id: req.body.id_publicacion},
    {$set: {eliminada: true}},
    function(err, publicacion) {
      if (!err) {
        res.status(200).json({message: 'Listo'});
      }
    });
});

router.put('/candidatos/verificar', authentication.isLoggedInAdmin, function(req, res, next) {
  var id_usuario = req.body.id_usuario;
  
  Usuario.findOneAndUpdate({id_usuario: id_usuario}, {$set: {verificado: true}}, function(err, usuario) {
    if (!err) {
      res.json(usuario);
    } else {
      console.log(err);
      res.status(500).json({message: 'No se pudo verificar al candidato, intente de nuevo'});
    }
  });

});

router.get('/verificaciones/solicitudes', authentication.isLoggedInAdmin, function(req, res, next) {
  SolicitudVerificacion.find({},null,{sort: {_id: -1}},function(err, solicitudes) {
    if (!err) {
      res.json(solicitudes);
    } else {
      res.status(500).json({message: 'Intente de nuevo'});
    }
  });

});

module.exports = router;
