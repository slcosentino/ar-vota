var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Usuario = require('../models/UsuarioSchema');
var Publicacion = require('../models/PublicacionSchema');
var Encuesta = require('../models/EncuestaSchema');
var UsuarioAccion = require('../models/UsuarioAccionSchema');
var EncuestaNueva = require('../models/EncuestaNuevaSchema');
var UsuarioEncuesta = require('../models/UsuarioEncuestaSchema');
var UsuarioSeguidor = require('../models/UsuarioSeguidorSchema');
var UsuarioNotificacion = require('../models/UsuarioNotificacionSchema');

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, usuario, info) {
    if (!usuario) {
      return res.status(401).json({message:'Nombre de usuario o password incorrecto'});
    }
    req.login(usuario, function(err) {
      if (err) {
        return next(err);
      }
      res.json({message:'Log in correcto'});
    })
  })(req, res, next);
});

router.post('/registro', function(req, res, next) {
  var usuario = new Usuario();
  usuario.id_usuario = req.body.id_usuario;
  if (req.body.password) {
      usuario.password = usuario.hashPassword(req.body.password);
  }
  usuario.nombre = req.body.nombre;
  usuario.apellido = req.body.apellido;
  usuario.ano_nacimiento = req.body.ano_nacimiento;
  usuario.email = req.body.email;
  usuario.esCiudadano = req.body.esCiudadano;
  usuario.fechaCreacion = req.body.fechaCreacion;
  usuario.imagen_perfil = req.body.imagen_perfil;
  usuario.zona = req.body.zona;

  usuario.save(function(err) {
    if (!err) {
      
      /* creando la coleccion usuarioencuestas*/
      var usuarioAccion = new UsuarioAccion();
      usuarioAccion.id_usuario = req.body.id_usuario;
      usuarioAccion.save(function(err) {
        if (err) {
          res.status(500).json({message: 'Error interno, intente de nuevo'});
          return;
        }
      });
      /* fin */

      /* creando la coleccion usuarioseguidores*/
      if (req.body.esCiudadano == false) {
        var usuarioSeguidor = new UsuarioSeguidor();
        usuarioSeguidor.id_usuario = req.body.id_usuario;
        usuarioSeguidor.save(function(err) {
          if (err) {
            res.status(500).json({message: 'Error interno, intente de nuevo'});
            return;
          }
        });
      }
      /* fin */

      /* creando la coleccion usuarionotificaciones*/
      var usuarioNotificacion = new UsuarioNotificacion();
      usuarioNotificacion.id_usuario = req.body.id_usuario;
      usuarioNotificacion.save(function(err) {
        if (err) {
          res.status(500).json({message: 'Error interno, intente de nuevo'});
          return;
        }
      });
      /* fin */
      
      req.login(usuario, function(err) {
        if (!err) {
          res.json({message: 'Usuario registrado con exito'})
        }
      });
    } else {
      if (err.code == 11000) {
        res.status(400).json({message: 'El id de usuario ya existe'});
      } else {
        res.status(400).json({message: 'Verifique los campos'});
      }
    }
  });
});

router.get('/me', authentication.isLoggedIn, function(req, res, next) {
  res.json(req.user);
});

router.get('/', authentication.isLoggedInAdmin, function(req, res, next) {
  Usuario.find(function(err, usuarios) {
    if (!err) {
      res.json(usuarios);
    } else {
      res.status(403).json({message: 'No esta logueado'});
    }
  });
});

router.get('/logout', function(req, res, next){
  req.session.destroy(function(err) {
    res.redirect('/');
  });
  //req.logout();
  //res.redirect('/');
});

router.post('/encuestas', authentication.isLoggedIn, function(req, res, next) {
  var id_encuesta = req.body.id_encuesta;
  var id_usuario = req.user.id_usuario;
  var ano_nacimiento = req.user.ano_nacimiento;
  var zona = req.user.zona;

  Encuesta.findOne({_id: id_encuesta}, function(err, encuesta) {
    if (err) {
      res.status(400).json({message: 'No se encuentra la encuesta'});
    }

    var cantidadPreguntas = encuesta.preguntas.length;
    var cantidadPreguntasRespondidas = req.body.resultado.length;

    if (cantidadPreguntas != cantidadPreguntasRespondidas) {
      res.status(400).json({message: 'Hay preguntas sin responder'});
      return;
    }

    encuesta.preguntas.forEach(function(pregunta, indexPregunta){
      pregunta.respuestas.forEach(function(respuesta, indexRespuesta) {
        if (req.body.resultado[indexPregunta].nro_respuesta == indexRespuesta + 1 ) {
          encuesta.preguntas[indexPregunta].respuestas[indexRespuesta].seleccionada = true;
        }
      });
    });
      
    usuarioEncuesta = new UsuarioEncuesta();
    usuarioEncuesta.id_usuario = id_usuario;
    usuarioEncuesta.ano_nacimiento = ano_nacimiento;
    usuarioEncuesta.zona = zona;
    usuarioEncuesta.id_encuesta = encuesta._id;
    usuarioEncuesta.titulo = encuesta.titulo;
    usuarioEncuesta.topico = encuesta.topico;
    usuarioEncuesta.preguntas = encuesta.preguntas;
    
    usuarioEncuesta.save(function(err) {
      if (!err) {
        UsuarioAccion.findOneAndUpdate(
          {id_usuario: req.user.id_usuario},
          {$push: {id_encuestas_completadas: id_encuesta}},
          function(err, usuarioAcciones) {
            if (!err) {
              res.status(200).json({message: 'Listo'});
            }
          });
      } else {
        res.status(400).json({message: 'Verifique los campos'});
      }
    });

  });
});

router.get('/encuestas/disponibles', authentication.isLoggedIn, function(req, res, next) {
  var id_usuario = req.user.id_usuario;

  UsuarioAccion.findOne({id_usuario: id_usuario}, function(err, usuarioAcciones) {
    if (!err) {
      if (usuarioAcciones) {
        var usuarioAcciones = usuarioAcciones.toObject();
        var encuestasCompletadas = usuarioAcciones['id_encuestas_completadas'];
      } else {
        var encuestasCompletadas = [];
      }

      EncuestaNueva.find({
        id_encuesta: { $not: {$in: encuestasCompletadas } }
      }, function(err, encuestas) {
        if (encuestas.length < 1) {
          res.status(204).send();
        } else {
          res.json(encuestas);
        }
      });
    } else {
        res.status(500).json({message: 'Error interno, intente de nuevo'});
    }
  });
});

router.get('/encuestas/nuevas', authentication.isLoggedIn, function(req, res, next) {
  var id_usuario = req.user.id_usuario;

  UsuarioAccion.findOne({id_usuario: id_usuario}, function(err, usuarioAcciones) {
    if (!err) {
      if (usuarioAcciones) {
        var usuarioAcciones = usuarioAcciones.toObject();
        var encuestasVistas = usuarioAcciones['id_encuestas_vistas'];
      } else {
        var encuestasVistas = [];
      }

      EncuestaNueva.find({
        id_encuesta: { $not: {$in: encuestasVistas } }
      }, function(err, encuestas) {
        if (encuestas.length < 1) {
          res.status(204).send();
        } else {
          res.json(encuestas);
        }
      });
    } else {
        res.status(500).json({message: 'Error interno, intente de nuevo'});
    }
  });
});

router.get('/encuestas/:id_encuesta', authentication.isLoggedIn, function(req, res, next) {
  var id_encuesta = req.params.id_encuesta;
 
  Encuesta.findOne({_id: id_encuesta},'-__v', function(err, encuesta) {
    if (!err) {
      UsuarioAccion.findOneAndUpdate(
        {id_usuario: req.user.id_usuario},
        {$push: {id_encuestas_vistas: id_encuesta}},
        function(err, usuarioAcciones) {
          if (!err) {
            res.json(encuesta);
          }
        });
    } else {
      res.status(400).json({message: 'No se encuentra la encuesta'});
    }
  });
});

router.post('/seguimientos', authentication.isLoggedIn, function(req, res, next) {
  var id_candidato = req.body.id_candidato;
  var id_usuario = req.user.id_usuario;

  UsuarioSeguidor.findOneAndUpdate(
    {id_usuario: id_candidato},
    {$addToSet: {id_seguidores: id_usuario}},
    function(err, usuarioSeguidor) {
      if (err) {
        res.status(500).json({message: 'Intente de nuevo'});
        return;
      }

      UsuarioAccion.findOneAndUpdate(
        {id_usuario: req.user.id_usuario},
        {$addToSet: {id_candidatos_seguidos: id_candidato}},
        function(err, usuarioAccion) {
          if (err) {
            res.status(500).json({message: 'Intente de nuevo'});
          } else {
            res.json({id_candidato: id_candidato});
          }
      });
  });
});

router.get('/seguimientos/publicaciones', authentication.isLoggedIn, function(req, res, next) {
  var id_usuario = req.user.id_usuario;
 
  UsuarioNotificacion.findOne({id_usuario: id_usuario}, function(err, usuarioNotificacion) {
    if (!err) {
      var usuarioNotificacion = usuarioNotificacion.toObject();
      var notificacionPublicaciones = usuarioNotificacion['notificacion_publicaciones'];

      res.json(notificacionPublicaciones);
    } else {
      res.status(500).json({message: 'Intente de nuevo'});
    }
  });
});

router.get('/:id_usuario', function(req, res, next) {
  var id_usuario = req.params.id_usuario;
 
  if (req.user && req.user.admin) {
    var filter = '-password -__v'
  } else {
    var filter = '-password -__v -email'
  }

  Usuario.findOne({id_usuario: id_usuario}, filter, function(err, usuario) {
    if (!err) {
      Publicacion.count({id_usuario: id_usuario}, function(err, publicaciones) {
        if (!err) {
          var usuarioObject = usuario.toObject();
          usuarioObject.publicaciones = publicaciones;

          UsuarioSeguidor.findOne({id_usuario: id_usuario}, function(err, usuarioSeguidor){
            if (usuarioSeguidor) {
              var usuarioSeguidorObject = usuarioSeguidor.toObject();
              var seguidores = usuarioSeguidorObject['id_seguidores'];

              usuarioObject.seguidores = seguidores.length;
            } else {
              usuarioObject.seguidores = 0;
            }
            console.log(usuarioObject);
            res.json(usuarioObject);
          });
        } else {
          return next(err);
        }
      });
    } else {
      res.status(401).json({message: 'Usuario no encontrado'});
    }
  });
});

router.put('/:id_usuario', authentication.isLoggedIn, function(req, res, next) {
  var id_usuario = req.params.id_usuario;

  if (!req.user.admin) {
    if (!req.user.id_usuario === id_usuario) {
      res.status(403).json({message: 'No tiene autorización'});
    }
  }

  Usuario.findOneAndUpdate({id_usuario: id_usuario},  req.body, {runValidators: true}, function(err, usuario) {
    if (!err) {
      usuario = usuario.toObject();
      delete usuario['password'];
      delete usuario['__v'];

      res.json(usuario);
    } else {
      //return next(err);

      res.status(401).json({message: 'Verifique los campos'});
    }
  });
});

router.get('/:id_usuario/publicaciones', function(req, res, next) {
  var id_usuario = req.params.id_usuario;
  
  Publicacion.find({id_usuario: id_usuario}, function(err, publicaciones) {
    if (!err) {
      res.json(publicaciones);
    } else {
      return next(err);
    }
  });
});

module.exports = router;
