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

router.post('/', function(req, res, next) {
  var encuesta = new Encuesta();

  encuesta.preguntas = req.body.preguntas;
  console.log(encuesta.preguntas);

  encuesta.save(function(err) {
    if (!err) {
      res.json({message: 'Encuesta creada con exito'})
    } else {
      res.status(400).json({message: 'Error al crear la encuesta'});
    }
  });
});

router.get('/topicos', function(req, res, next) {
  Topico.find('-_id', function(err, topicos){
    if (!err) {
      res.json(topicos);
    } else {
      return next(err);
    }
  });
});

module.exports = router;
