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
  var limite = 5;

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
    { $sort: {'cantidad': -1}},
    { $limit: limite }
  ], function(err, result) {
    if (err) {
      console.log(err);
    }
    
    var resultArray = [];

    for (var i = 0 ; i < result.length ; i++) {
      var zonaObject = {};

      zonaObject.zona = result[i]._id.zona;
      zonaObject.cantidad = result[i].cantidad;

      resultArray.push(zonaObject);
    }

    if (result.length < limite) {
      for (var i = result.length ; i < limite ; i++) {
        var zonaObject = {};

        zonaObject.zona = 'No disponible';
        zonaObject.cantidad = 0;

        resultArray.push(zonaObject);
      }
    }

    res.json(resultArray);
  });
});

// ?id_encuesta=1234&nro_pregunta=2&nro_respuesta=1
router.get('/encuestas/filtro/edad', function(req, res, next) {
  var id_encuesta = req.query.id_encuesta;
  var nro_pregunta = Number(req.query.nro_pregunta);
  var nro_respuesta = Number(req.query.nro_respuesta);
  var limite = 5;

  UsuarioEncuesta.aggregate([
    { $match: {'id_encuesta': id_encuesta}},
    { $unwind: '$preguntas'},
    { $unwind: '$preguntas.respuestas'},
    { $match: {'preguntas.nro_pregunta': nro_pregunta}},
    { $match: {'preguntas.respuestas.nro_respuesta': nro_respuesta}},
    { $match: {'preguntas.respuestas.seleccionada': true}},
    { $project: {ano_nacimiento: 1, _id: 0}},
    { $sort: {'ano_nacimiento': 1}}
  ], function(err, result) {
    if (err) {
      console.log(err);
    }
    
    var ano = new Date().getFullYear();
    var edadesArray = [];
    var descripcionesArray = [];
    var resultArray = [];

    for (var i = 0 ; i < 10 ; i++) {
      edadesArray[i] = 0;
    }

    for (var i = 0 ; i < result.length ; i++) {
      var edad = ano - result[i].ano_nacimiento;

      if (edad < 21) {
        edadesArray[0]++;
      } else if (edad < 31) {
        edadesArray[1]++;
      } else if (edad < 41) {
        edadesArray[2]++;
      } else if (edad < 51) {
        edadesArray[3]++;
      } else if (edad < 61) {
        edadesArray[4]++;
      } else if (edad < 71) {
        edadesArray[5]++;
      } else if (edad < 81) {
        edadesArray[6]++;
      } else if (edad < 91) {
        edadesArray[7]++;
      } else if (edad < 101) {
        edadesArray[8]++;
      } else {
        edadesArray[9]++;
      }
    }

    descripcionesArray[0] = 'Menos de 21';
    descripcionesArray[1] = '22 a 31';
    descripcionesArray[2] = '32 a 41';
    descripcionesArray[3] = '42 a 51';
    descripcionesArray[4] = '52 a 61';
    descripcionesArray[5] = '62 a 71';
    descripcionesArray[6] = '72 a 81';
    descripcionesArray[7] = '82 a 91';
    descripcionesArray[8] = '92 a 101';
    descripcionesArray[9] = 'Mas de 101';

    for (var i = 0 ; i < 10 ; i++) {
      var resultObject = {};
      resultObject.descripcion = descripcionesArray[i];
      resultObject.cantidad = edadesArray[i];
      resultArray.push(resultObject);
    }
    
    res.json(resultArray);
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
