var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Encuesta = require('../models/EncuestaSchema');
var Topico = require('../models/TopicoSchema');

router.get('/', authentication.isLoggedInAdmin, function(req, res, next) {
  Encuesta.find(function(err, encuestas){
    if (!err) {
      res.json(encuestas);
    } else {
      return next(err);
    }
  });
});

router.post('/', authentication.isLoggedInAdmin, function(req, res, next) {
  var encuesta = new Encuesta();

  encuesta.topico = req.body.topico;
  encuesta.titulo = req.body.titulo;
  encuesta.preguntas = req.body.preguntas;

  encuesta.save(function(err) {
    if (!err) {
      res.json(encuesta);
    } else {
      res.status(400).json({message: 'Error al crear la encuesta'});
    }
  });
});

router.get('/topicos', authentication.isLoggedInAdmin, function(req, res, next) {
  Topico.find('-_id', function(err, topicos){
    if (!err) {
      res.json(topicos);
    } else {
      return next(err);
    }
  });
});

router.get('/:id_encuesta', authentication.isLoggedInAdmin, function(req, res, next) {
  var id_encuesta = req.params.id_encuesta;
 
  Encuesta.findOne({_id: id_encuesta},'-__v', function(err, encuesta) {
    if (!err) {
      res.json(encuesta);
    } else {
      res.status(400).json({message: 'No se encuentra la encuesta'});
    }
  });
});

router.put('/:id_encuesta', authentication.isLoggedInAdmin, function(req, res, next) {
  var id_encuesta = req.params.id_encuesta;

  Encuesta.findOneAndUpdate({_id: id_encuesta},  req.body, function(err, encuesta) {
    if (!err) {
      res.json(encuesta);
    } else {
      res.status(400).json({message: 'No se pudo actualizar la encuesta'});
    }
  });
});

module.exports = router;
