var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('util');
var multiparty = require('multiparty');

var authentication = require('../middlewares/authentication');
var Usuario = require('../models/UsuarioSchema');
var Image = require('../models/ImageSchema');


router.post('/', function(req, res, next) {
  var form = new multiparty.Form();
  form.autoFiles = true;
  form.uploadDir = './data/imagenes'; 

  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
    res.status(500).json({message: 'Error al intentar guardar la imagen'});
  });

  form.on('file', function(name, file) {
    var path = file.path;
    var returnPath = path.substring(path.indexOf('/') + 1);
    res.status(200).json({path: returnPath});
  });

  form.on('close', function() {
    console.log('done parsing form');
  });

  form.parse(req);

});


router.get('/:id_imagen', function(req, res, next) {
  var id_imagen = req.params.id_imagen;

  Image.findOne({_id: id_imagen}, function(err, image) {
    if (!err) {
      res.contentType(image.type);
      res.send(image.data);
    } else {
      return next(err);
    }
  });
});


module.exports = router;
