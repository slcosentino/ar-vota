var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Publicacion = require('../models/PublicacionSchema');

router.post('/', authentication.isLoggedIn, function(req, res, next) {
  var publicacion = new Publicacion();
  var id = req.params.id;

  publicacion.id_usuario = req.user.id_usuario;
  publicacion.titulo = req.body.titulo;
  publicacion.descripcion = req.body.descripcion;
  publicacion.propuesta = true;
  publicacion.imagen = req.body.imagen;

  publicacion.save(function(err) {
    if (!err) {
      res.json({message: 'Publicacion creada con exito'})
    } else {
      res.status(400).json({message: 'Verifique los campos'});
    }
  });
});

router.get('/', function(req, res, next) {
  Publicacion.find(function(err, publicaciones) {
    if (!err) {
      res.json(publicaciones);
    } else {
      return next(err);
    }
  });
});

router.get('/propuestas', function(req, res, next) {
  Publicacion.find( {propuesta: true}, function(err, publicaciones) {
    if (!err) {
      res.json(publicaciones);
    } else {
      return next(err);
    }
  });
});

module.exports = router;
