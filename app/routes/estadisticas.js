var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var UsuarioEncuesta = require('../models/UsuarioEncuestaSchema');

// ?id_encuesta=1234&nro_pregunta=2&nro_respuesta=1
router.get('/encuestas/filtro/zona', function(req, res, next) {
  var id_encuesta = req.query.id_encuesta;
  var nro_pregunta = Number(req.query.nro_pregunta);
  var nro_respuesta = Number(req.query.nro_respuesta);

  UsuarioEncuesta.aggregate([
    { $match: {'id_encuesta': id_encuesta}},
    { $unwind: '$preguntas'},
    { $unwind: '$preguntas.respuestas'},
    { $match: {'preguntas.nro_pregunta': nro_pregunta}},
    { $match: {'preguntas.respuestas.nro_respuesta': nro_respuesta}},
    { $match: {'preguntas.respuestas.seleccionada': true}},
    {
      $group: {
        _id: {
          zona: '$zona'
        },
        cantidad: {$sum: 1}
      }
    },
    { $sort: {'_id.cantidad': 1}},
    { $limit: 5 }
  ], function(err, result) {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

router.get('/encuestas/:id_encuesta', function(req, res, next) {
  var id_encuesta = req.params.id_encuesta;

  UsuarioEncuesta.aggregate([
    { $match: {'id_encuesta': id_encuesta}},
    { $unwind: '$preguntas'},
    { $unwind: '$preguntas.respuestas'},
    { $match: {'preguntas.respuestas.seleccionada': true}},
    { 
      $group: {
        _id: {
          nro_pregunta: '$preguntas.nro_pregunta',
          nro_respuesta: '$preguntas.respuestas.nro_respuesta'
        },
        selecciones: {$sum: 1}
      }
    },
    { $sort: {'_id.nro_pregunta': 1, '_id.nro_respuesta': 1}}
  ], function(err, result) {
    if (err) {
      console.log(err);
    }

    resultArray = [];
    var aux = 1;
    var respuestasArray = [];

    for (var i = 0 ; i < result.length ; i++) {
      if (result[i]._id.nro_pregunta == aux) {
        var respuesta = {};
        respuesta.nro_respuesta = result[i]._id.nro_respuesta;
        respuesta.selecciones = result[i].selecciones;
        respuestasArray.push(respuesta);
      } else {
        var pregunta = {};
        pregunta.nro_pregunta = aux;
        pregunta.respuestas = respuestasArray;
        resultArray.push(pregunta);
        respuestasArray = [];

        var respuesta = {};
        respuesta.nro_respuesta = result[i]._id.nro_respuesta;
        respuesta.selecciones = result[i].selecciones;
        respuestasArray.push(respuesta);
        aux++;
      }
    }
        var pregunta = {};
        pregunta.nro_pregunta = aux;
        pregunta.respuestas = respuestasArray;
        resultArray.push(pregunta);

    res.json(resultArray);
  });
});

module.exports = router;
