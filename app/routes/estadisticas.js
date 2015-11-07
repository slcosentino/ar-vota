var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var UsuarioEncuesta = require('../models/UsuarioEncuestaSchema');

router.get('/encuestas/:id_encuesta', function(req, res, next) {
  var id_encuesta = req.params.id_encuesta;

 /* 
  UsuarioEncuesta.find({id_encuesta: id_encuesta},'-__v', function(err, encuestas) {
    if (!err) {
      res.json(encuestas);
    } else {
      res.status(400).json({message: 'No se encuentra la encuesta'});
    }
  });
  */

  UsuarioEncuesta.aggregate([
    { $match: {'id_encuesta': id_encuesta}},
    { $unwind: '$preguntas'},
    { $unwind: '$preguntas.respuestas'},
    { $match: {'preguntas.respuestas.seleccionada': true}},
    //{ $match: {'preguntas.respuestas.nro_respuesta': 1}},
    { 
      $group: {
        _id: {
          nro_pregunta: '$preguntas.nro_pregunta',
          nro_respuesta: '$preguntas.respuestas.nro_respuesta'
        },
        selecciones: {$sum: 1}
      }
    },
    { $sort: {'_id.nro_pregunta': 1}},
    { $sort: {'_id.nro_respuesta': 1}}
  ], function(err, result) {
    if (err) {
      console.log(err);
    }

    res.json(result);

  });
});


module.exports = router;
