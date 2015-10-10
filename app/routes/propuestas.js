var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Propuesta = require('../models/PropuestaSchema');
var Comentario = require('../models/ComentarioSchema');
var Provincia = require('../models/ProvinciaSchema');

router.post('/', authentication.isLoggedIn, function(req, res, next) {
  var propuesta = new Propuesta();
  var id = req.params.id;
  propuesta.id_usuario = req.user.id_usuario;
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

router.get('/', /*authentication.isLoggedIn,*/ function(req, res, next) {
  Propuesta.find(function(err, propuestas) {
    if (!err) {
      res.json(propuestas);
    } else {
      return next(err);
    }
  });
});

router.post('/comentar/:id', function(req, res, next) {
  var id = req.params.id;

  var comentario = new Comentario();
  var propuesta = Propuesta.findOne({_id: id}, function(err, propuesta) {
    if (err) {
      console.log(err);
      res.status(400).json({message: 'Propuesta no encontrada'})
    } else {
      propuesta.toObject();
	  comentario.id_usuario = req.user.id_usuario;
      comentario.id_publicacion = propuesta['_id'];
      comentario.descripcion = req.body.comentario;

      comentario.save(function(err) {
        if (!err) {
          res.json({message: 'Comentario creada con exito'})
        } else {
          console.log(err);
          res.status(400).json({message: 'Verifique los campos'});
        }
      });
    }
  });
});

router.put('/like/:id', function(req, res, next) {
  var id = req.params.id;

  Propuesta.findOneAndUpdate({_id: id},  {$inc: {cantidad_likes: 1}}, function(err, propuesta) {
    if (!err) {
      res.json(propuesta);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

router.put('/disLike/:id', function(req, res, next) {
  var id = req.params.id;
		
  Propuesta.findOneAndUpdate({_id: id},  {$inc: {cantidad_disLikes: 1}}, function(err, propuesta) {
    if (!err) {
      res.json(propuesta);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

router.get('/comentarios', authentication.isLoggedIn, function(req, res, next) {
  Comentario.find(function(err, comentario) {
    if (!err) {
      res.json(comentario);
    } else {
      return next(err);
    }
  });
});

router.get('/provinciasCiudades', function(req, res, next) {
	Provincia.find(function(err, provinciaCiudad){
	    if (!err) {
	      res.json(provinciaCiudad);
	    } else {
	      return next(err);
	    }
	});
});

router.get('/:id',  function(req, res, next) {
  var id = req.params.id;
 
	Propuesta.findOne({_id: id}, function(err, propuesta) {
		if (!err) {
		  res.json(propuesta);
		} else {
		  return next(err);
		}
	});

});

module.exports = router;
