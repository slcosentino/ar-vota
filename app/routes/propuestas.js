var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Propuesta = require('../models/PropuestaSchema');
var Comentario = require('../models/ComentarioSchema');

router.post('/', function(req, res, next) {
  var propuesta = new Propuesta();
  //propuesta.id_usuario = req.body.id_usuario;
  propuesta.titulo = req.body.titulo;
  propuesta.descripcion = req.body.descripcion;
  // propuesta.imagen = req.body.imagen;

  propuesta.save(function(err) {
    if (!err) {
      res.json({message: 'Propuesta creada con exito'})
    } else {
      res.status(400).json({message: 'Verifique los campos'});
    }
  });
});

router.get('/', authentication.isLoggedIn, function(req, res, next) {
  Propuesta.find(function(err, propuestas) {
    if (!err) {
      res.json(propuestas);
    } else {
      return next(err);
    }
  });
});

router.get('/pepe', authentication.isLoggedIn, function(req, res, next) {
	var id_propuesta = req.params.propuesta;
 
	Propuesta.findOne({titulo: 'prop'}, function(err, propuesta) {
		if (!err) {
		  res.json(propuesta);
		} else {
		  return next(err);
		}
	});
});

// router.post('/comentar/:_id', function(req, res, next) {
	
	// var comentario = new Comentario();
	// var propuesta = Propuesta.findOne({_id: _id}, function(err, propuesta) {
		// if (!err) {
			// res.json(propuesta);
		// } else {
			// return next(err);
		// }
	// });
  
	// if(propuesta != 'undefined') {
		// comentario.id_propuesta = req.body.id_propuesta;
		// comentario.descripcion = req.body.descripcion;  
	// } else {
		// res.status(400).json({message: 'Verifique los campos'});
    // }

	// comentario.save(function(err) {
		// if (!err) {
		  // res.json({message: 'Comentario creada con exito'})
		// } else {
		  // res.status(400).json({message: 'Verifique los campos'});
		// }
	// });
// });

router.put('/like/pepe', function(req, res, next) {
    Propuesta.findOneAndUpdate({titulo: 'prop'},  req.body, function(err, propuesta) {
    if (!err) {
      propuesta = propuesta.toObject();
	  propuesta.cantidad_likes = 1; 
      res.json(propuesta);
    } else {
      console.log(err);
      return next(err);
    }
  });
});

router.put('/disLike/pepe', function(req, res, next) {
    Propuesta.findOneAndUpdate({titulo: 'prop'},  req.body, function(err, propuesta) {
    if (!err) {
      propuesta = propuesta.toObject();
	  propuesta.cantidad_disLikes = 1; 
      res.json(propuesta);
    } else {
      console.log(err);
      return next(err);
    }
  });
});

module.exports = router;
