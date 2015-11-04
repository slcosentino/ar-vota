var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Publicacion = require('../models/PublicacionSchema');
var Comentario = require('../models/ComentarioSchema');
var Respuesta = require('../models/RespuestaSchema');
var Publicator = require('../modules/Publicator');

router.post('/propuestas', authentication.isCandidato, function(req, res, next) {
  Publicator.propuesta(req, res, next);
});


router.post('/quejas', authentication.isCiudadano, function(req, res, next) {
  Publicator.queja(req, res, next);
});

router.get('/', function(req, res, next) {
  Publicacion.find(function(err, publicaciones) {
    if (!err) {
      res.json(publicaciones);
    } else {
      return next(err);
    }
  });
});

router.get('/propuestas', function(req, res, next) {
  Publicacion.find( {propuesta: true}, function(err, publicaciones) {
    if (!err) {
      res.json(publicaciones);
    } else {
      return next(err);
    }
  });
});

router.get('/quejas', function(req, res, next) {
  Publicacion.find( {propuesta: false}, function(err, publicaciones) {
    if (!err) {
      res.json(publicaciones);
    } else {
      return next(err);
    }
  });
});

router.get('/:id_publicacion', function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;
 
  Publicacion.findOne({_id: id_publicacion},'-__v', function(err, publicacion) {
    if (!err) {
      res.json(publicacion);
    } else {
      return next(err);
    }
  });
});

router.put('/:id_publicacion/like', function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;

  Publicacion.findOneAndUpdate({_id: id_publicacion},  {$inc: {cantidad_likes: 1}}, function(err, publicacion) {
    if (!err) {
      res.json(publicacion);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

router.put('/:id_publicacion/disLike', function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;
		
  Publicacion.findOneAndUpdate({_id: id_publicacion},  {$inc: {cantidad_disLikes: 1}}, function(err, publicacion) {
    if (!err) {
      res.json(publicacion);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

router.get('/:id_publicacion/comentarios', function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;

  Comentario.find({id_publicacion: id_publicacion}, function(err, comentario) {
    if (!err) {
      res.json(comentario);
    } else {
      return next(err);
    }
  });
});

router.post('/:id_publicacion/comentarios', authentication.isLoggedIn, function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;

  var comentario = new Comentario();
  var publicacion = Publicacion.findOne({_id: id_publicacion}, function(err, publicacion) {
    if (err) {
      res.status(400).json({message: 'Publicacion no encontrada'})
    } else {
      publicacion.toObject();
      comentario.id_usuario = req.user.id_usuario;
      comentario.id_publicacion = publicacion['_id'];
      comentario.descripcion = req.body.descripcion;

      comentario.save(function(err) {
        if (!err) {
          res.json({message: 'Comentario creada con exito'})
        } else {
          res.status(400).json({message: 'Verifique los campos'});
        }
      });
    }
  });
});

router.put('/likeComentario/:id_comentario', function(req, res, next) {
  var id_comentario = req.params.id_comentario;

  Comentario.findOneAndUpdate({_id: id_comentario},  {$inc: {cantidad_likes: 1}}, function(err, comentario) {
    if (!err) {
      res.json(comentario);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

router.put('/disLikeComentario/:id_comentario/', function(req, res, next) {
  var id_comentario = req.params.id_comentario;
		
  Comentario.findOneAndUpdate({_id: id_comentario},  {$inc: {cantidad_disLikes: 1}}, function(err, comentario) {
    if (!err) {
      res.json(comentario);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

router.get('/:id_comentario/respuestas', function(req, res, next) {
  var id_comentario = req.params.id_comentario;

  Respuesta.find({id_comentario: id_comentario}, function(err, respuesta) {
    if (!err) {
      res.json(respuesta);
    } else {
      return next(err);
    }
  });
});

router.post('/:id_comentario/respuestas', authentication.isLoggedIn, function(req, res, next) {
  var id_comentario = req.params.id_comentario;

  var respuesta = new Respuesta();
  var comentario = Comentario.findOne({_id: id_comentario}, function(err, comentario) {
    if (err) {
      res.status(400).json({message: 'Comentario no encontrado'})
    } else {
      comentario.toObject();
      respuesta.id_usuario = req.user.id_usuario;
      respuesta.id_comentario = comentario['_id'];
      respuesta.descripcion = req.body.descripcion;

      respuesta.save(function(err) {
        if (!err) {
          res.json({message: 'Respuesta creada con exito'})
        } else {
          res.status(400).json({message: 'Verifique los campos'});
        }
      });
    }
  });
});

router.put('/likeRespuesta/:id_respuesta', function(req, res, next) {
  var id_respuesta = req.params.id_respuesta;

  Respuesta.findOneAndUpdate({_id: id_respuesta},  {$inc: {cantidad_likes: 1}}, function(err, respuesta) {
    if (!err) {
      res.json(respuesta);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

router.put('/disLikeRespuesta/:id_respuesta/', function(req, res, next) {
  var id_respuesta = req.params.id_respuesta;
		
  Respuesta.findOneAndUpdate({_id: id_respuesta},  {$inc: {cantidad_disLikes: 1}}, function(err, respuesta) {
    if (!err) {
      res.json(respuesta);
    } else {
      console.log(err);
      return next(err);
    }   
  }); 
});

module.exports = router;
