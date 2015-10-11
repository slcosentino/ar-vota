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

  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
    res.status(500).json({message: 'Error al intentar guardar la imagen'});
  });

  form.on('part', function(part) {
    var chunks = [];

    if (part.filename) {
      part.on('data', function (chunk){
        chunks.push(chunk);
      });

      part.on('end', function() {
        var image = new Image();
        image.type = part.headers['content-type'];
        image.data = Buffer.concat(chunks);
        
        image.save(function(err, image) {
          if (err) {
           res.status(500).json({message: 'Error al intentar guardar la imagen'});
          }
          res.status(200).json({id: image._id});
        });
      });
    }
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
