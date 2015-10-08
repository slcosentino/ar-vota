var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Queja = require('../models/QuejaSchema');
var Comentario = require('../models/ComentarioSchema');
var Provincia = require('../models/ProvinciaSchema');

router.post('/', function(req, res, next) {
  var queja = new Queja();
  var id = req.params.id;
  queja.id_usuario = req.user.id_usuario;
  queja.titulo = req.body.titulo;
  queja.descripcion = req.body.descripcion;
  // queja.imagen = req.body.imagen;

  queja.save(function(err) {
    if (!err) {
      res.json({message: 'Queja creada con exito'})
    } else {
      res.status(400).json({message: 'Verifique los campos'});
    }
  });
});

router.get('/', /*authentication.isLoggedIn,*/ function(req, res, next) {
  Queja.find(function(err, quejas) {
    if (!err) {
      res.json(quejas);
    } else {
      return next(err);
    }
  });
});

router.get('/:id',  function(req, res, next) {
  var id = req.params.id;
 
	Queja.findOne({_id: id}, function(err, queja) {
		if (!err) {
		  res.json(queja);
		} else {
		  return next(err);
		}
	});
});

router.post('/comentar/:id', function(req, res, next) {
  var id = req.params.id;

  var comentario = new Comentario();
  var queja = Queja.findOne({_id: id}, function(err, queja) {
    if (err) {
      console.log(err);
      res.status(400).json({message: 'Queja no encontrada'})
    } else {
      queja.toObject();
	  comentario.id_usuario = req.user.id_usuario;
      comentario.id_publicacion = queja['_id'];
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

  Queja.findOneAndUpdate({_id: id},  {$inc: {cantidad_likes: 1}}, function(err, queja) {
    if (!err) {
      res.json(queja);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

router.put('/disLike/:id', function(req, res, next) {
  var id = req.params.id;
		
  Queja.findOneAndUpdate({_id: id},  {$inc: {cantidad_disLikes: 1}}, function(err, queja) {
    if (!err) {
      res.json(queja);
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

module.exports = router;
