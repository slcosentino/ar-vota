var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Publicacion = require('../models/PublicacionSchema');
var Comentario = require('../models/ComentarioSchema');
var Respuesta = require('../models/RespuestaSchema');
var Publicator = require('../modules/Publicator');
var UsuarioAccion = require('../models/UsuarioAccionSchema');
var UsuarioNotificacion = require('../models/UsuarioNotificacionSchema');
var PublicacionLike = require('../models/PublicacionLikeSchema');
var PublicacionDisLike = require('../models/PublicacionDisLikeSchema');
var ComentarioLike = require('../models/ComentarioLikeSchema');
var ComentarioDisLike = require('../models/ComentarioDisLikeSchema');
var RespuestaLike = require('../models/RespuestaLikeSchema');
var RespuestaDisLike = require('../models/RespuestaDisLikeSchema');
var UsuarioAceptacion = require('../models/UsuarioAceptacionSchema');

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

router.get('/comentarios/:id_comentario', function(req, res, next) {
  var id_comentario = req.params.id_comentario;

  Comentario.findOne({_id: id_comentario},'-__v', function(err, comentario) {
    if (!err) {
      res.json(comentario);
    } else {
      return next(err);
    }
  });
});


router.put('/likeComentario/:id_comentario', function(req, res, next) {
  var id_comentario = req.params.id_comentario;

  ComentarioLike.findOne({id_usuario: req.user.id_usuario, id_comentario: id_comentario}, function(err, comentarioLike) {
    if (!err) {
      if (comentarioLike) {
        res.status(400).json({message: 'Sólo se puede dar un me gusta'});
      } else {
        var comentarioLike = new ComentarioLike();

        comentarioLike.id_usuario = req.user.id_usuario;
        comentarioLike.id_comentario = id_comentario;

        comentarioLike.save(function(err) {
          if (!err) {
            Comentario.findOneAndUpdate({_id: id_comentario},  {$inc: {cantidad_likes: 1}}, function(err, comentario) {
              if (!err) {
                res.json(comentario);
              } else {
                console.log(err);
                return next(err);
              }   
            });
          } else {
            res.status(400).json({message: 'Verifique los campos'});
          }
        });
      }
    } else {
      res.status(400).json({message: 'Error'});
    }
  });
});

router.put('/disLikeComentario/:id_comentario', function(req, res, next) {
  var id_comentario = req.params.id_comentario;

  ComentarioDisLike.findOne({id_usuario: req.user.id_usuario, id_comentario: id_comentario}, function(err, comentarioDisLike) {
    if (!err) {
      if (comentarioDisLike) {
        res.status(400).json({message: 'Sólo se puede dar un no me gusta'});
      } else {
        var comentarioDisLike = new ComentarioDisLike();

        comentarioDisLike.id_usuario = req.user.id_usuario;
        comentarioDisLike.id_comentario = id_comentario;

        comentarioDisLike.save(function(err) {
          if (!err) {
            Comentario.findOneAndUpdate({_id: id_comentario},  {$inc: {cantidad_disLikes: 1}}, function(err, comentario) {
              if (!err) {
                res.json(comentario);
              } else {
                console.log(err);
                return next(err);
              }   
            });
          } else {
            res.status(400).json({message: 'Verifique los campos'});
          }
        });
      }
    } else {
      res.status(400).json({message: 'Error'});
    }
  });
});



router.put('/likeRespuesta/:id_respuesta', function(req, res, next) {
  var id_respuesta = req.params.id_respuesta;

  RespuestaLike.findOne({id_usuario: req.user.id_usuario, id_respuesta: id_respuesta}, function(err, respuestaLike) {
    if (!err) {
      if (respuestaLike) {
        res.status(400).json({message: 'Sólo se puede dar un me gusta'});
      } else {
        var respuestaLike = new RespuestaLike();

        respuestaLike.id_usuario = req.user.id_usuario;
        respuestaLike.id_respuesta = id_respuesta;

        respuestaLike.save(function(err) {
          if (!err) {
            Respuesta.findOneAndUpdate({_id: id_respuesta},  {$inc: {cantidad_likes: 1}}, function(err, respuesta) {
              if (!err) {
                res.json(respuesta);
              } else {
                console.log(err);
                return next(err);
              }   
            });
          } else {
            res.status(400).json({message: 'Verifique los campos'});
          }
        });
      }
    } else {
      res.status(400).json({message: 'Error'});
    }
  });
});

router.put('/disLikeRespuesta/:id_respuesta', function(req, res, next) {
  var id_respuesta = req.params.id_respuesta;

  RespuestaDisLike.findOne({id_usuario: req.user.id_usuario, id_respuesta: id_respuesta}, function(err, respuestaDisLike) {
    if (!err) {
      if (respuestaDisLike) {
        res.status(400).json({message: 'Sólo se puede dar un no me gusta'});
      } else {
        var respuestaDisLike = new RespuestaDisLike();

        respuestaDisLike.id_usuario = req.user.id_usuario;
        respuestaDisLike.id_respuesta = id_respuesta;

        respuestaDisLike.save(function(err) {
          if (!err) {
            Respuesta.findOneAndUpdate({_id: id_respuesta},  {$inc: {cantidad_disLikes: 1}}, function(err, respuesta) {
              if (!err) {
                res.json(respuesta);
              } else {
                console.log(err);
                return next(err);
              }   
            });
          } else {
            res.status(400).json({message: 'Verifique los campos'});
          }
        });
      }
    } else {
      res.status(400).json({message: 'Error'});
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
      respuesta.imagen_perfil = req.user.imagen_perfil;
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

router.get('/:id_publicacion', function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;

  Publicacion.findOne({_id: id_publicacion},'-__v', function(err, publicacion) {
    if (!err) {
      if (req.user){
        UsuarioAccion.findOneAndUpdate(
          {id_usuario: req.user.id_usuario},
          {$addToSet: {id_propuestas_vistas: id_publicacion}},
          function(err, usuarioAccion) {
            if (err) {
              res.status(500).json({message: 'Intente de nuevo'});
              return;
            } else {
              UsuarioNotificacion.findOneAndUpdate(
                {id_usuario: req.user.id_usuario},
                {$pull: {notificacion_publicaciones: {id_objeto: id_publicacion}}},
                function(err, usuarioNotificacion) {
                  if (err) {
                    res.status(500).json({message: 'Intente de nuevo'});
                    return;
                  } else {
                    res.json(publicacion);
                  }
                });
            }
          });
      } else {
        res.json(publicacion);
      }

    } else {
      return next(err);
    }
  });
});

router.put('/:id_publicacion/like', function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;

  PublicacionLike.findOne({id_usuario: req.user.id_usuario, id_publicacion: id_publicacion}, function(err, publicacionLike) {
    if (!err) {
      if (publicacionLike) {
        res.status(400).json({message: 'Sólo se puede dar un me gusta'});
      } else {
        var publicacionLike = new PublicacionLike();

        publicacionLike.id_usuario = req.user.id_usuario;
        publicacionLike.id_publicacion = id_publicacion;

        publicacionLike.save(function(err) {
          if (!err) {
            Publicacion.findOneAndUpdate({_id: id_publicacion},  {$inc: {cantidad_likes: 1}}, function(err, publicacion) {
              if (!err) {
                res.json(publicacion);
              } else {
                console.log(err);
                return next(err);
              }   
            });
          } else {
            res.status(400).json({message: 'Verifique los campos'});
          }
        });
      }
    } else {
      res.status(400).json({message: 'error'});
    }
  });
});

router.put('/:id_publicacion/disLike', function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;

  PublicacionDisLike.findOne({id_usuario: req.user.id_usuario, id_publicacion: id_publicacion}, function(err, publicacionDisLike) {
    if (!err) {
      if (publicacionDisLike) {
        res.status(400).json({message: 'Sólo se puede dar un no me gusta'});
      } else {
        var publicacionDisLike = new PublicacionDisLike();

        publicacionDisLike.id_usuario = req.user.id_usuario;
        publicacionDisLike.id_publicacion = id_publicacion;

        publicacionDisLike.save(function(err) {
          if (!err) {
            Publicacion.findOneAndUpdate({_id: id_publicacion},  {$inc: {cantidad_disLikes: 1}}, function(err, publicacion) {
              if (!err) {
                res.json(publicacion);
              } else {
                console.log(err);
                return next(err);
              }   
            });
          } else {
            res.status(400).json({message: 'Verifique los campos'});
          }
        });
      }
    } else {
      res.status(400).json({message: 'error'});
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
      comentario.imagen_perfil = req.user.imagen_perfil;
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

router.post('/:id_publicacion/aceptaciones', authentication.isLoggedIn, function(req, res, next) {
  var id_publicacion = req.params.id_publicacion;
  var id_usuario = req.user.id_usuario;

  var publicacion = Publicacion.findOne({_id: id_publicacion}, function(err, publicacion) {
    if (err) {
      res.status(500).json({message: 'Intente de nuevo'})
    } else {
      if (!publicacion) {
        res.status(400).json({message: 'Queja no encontrada'})
      }
      if (publicacion.aceptada_por) {
        res.status(400).json({message: 'La Queja ya fue aceptada'})
      }
      publicacion.aceptada = true;
      publicacion.aceptada_por = id_usuario;

      publicacion.save(function(err) {
        if (!err) {
          UsuarioAceptacion.findOneAndUpdate(
            {id_usuario: req.user.id_usuario},
            {$addToSet: {id_quejas_aceptadas: id_publicacion}},
            function(err, usuarioAccion) {
              if (err) {
                res.status(500).json({message: 'Intente de nuevo'})
              } else {
                res.json({message: 'Queja aceptada con exito!'})
              }
            });
        } else {
          res.status(400).json({message: 'Verifique los campos'});
        }
      });
    }
  });
});

module.exports = router;
