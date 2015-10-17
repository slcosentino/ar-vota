var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Encuesta = require('../models/EncuestaSchema');
var Topico = require('../models/TopicoSchema');
var Anuncio = require('../models/AnuncioSchema');

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

  var preguntas = req.body.preguntas;
  if (preguntas.length <= 0) {
    res.status(401).json({message: 'Debe agregar al menos una pregunta'});
    return;
  }

  for (var i = 0 ; i < preguntas.length ; i++) {
    if (preguntas[i].respuestas.length <= 1) {
      res.status(401).json({message: 'Debe agregar al menos dos respuestas'});
      return;
    }
  }

  encuesta.preguntas = preguntas;

  encuesta.save(function(err) {
    if (!err) {
      res.json(encuesta);
    } else {
      res.status(401).json({message: 'Error al crear la encuesta, verifique los campos'});
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

router.post('/anuncios', authentication.isLoggedInAdmin, function(req, res, next) {
  var id_encuesta = req.body.id_encuesta;

  Encuesta.findOne({_id: id_encuesta}, function(err, encuesta) {
    if (err) {
      res.status(400).json({message: 'No se encuentra la encuesta'});
    }

    var encuesta = encuesta.toObject();
    var titulo = encuesta['titulo'];
    var topico = encuesta['topico'];

    anuncio = new Anuncio();
    anuncio.id_encuesta = id_encuesta;
    anuncio.titulo = titulo;
    anuncio.topico = topico;

    anuncio.save(function(err) {
      if (!err) {
        res.json({message: 'Encuesta anunciada con exito'});
      } else {
        res.status(500).json({message: 'Error al crear anuncio'});
      }
    });
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

  var preguntas = req.body.preguntas;
  if (preguntas.length <= 0) {
    res.status(401).json({message: 'Debe agregar al menos una pregunta'});
    return;
  }

  for (var i = 0 ; i < preguntas.length ; i++) {
    if (preguntas[i].respuestas.length <= 1) {
      res.status(401).json({message: 'Debe agregar al menos dos respuestas'});
      return;
    }
  }

  encuesta.preguntas = preguntas;
  
  Encuesta.findOneAndUpdate({_id: id_encuesta},  req.body, function(err, encuesta) {
    if (!err) {
      res.json(encuesta);
    } else {
      res.status(400).json({message: 'No se pudo actualizar la encuesta'});
    }
  });
});

module.exports = router;
