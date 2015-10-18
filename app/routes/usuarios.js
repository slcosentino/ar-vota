var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Usuario = require('../models/UsuarioSchema');
var Publicacion = require('../models/PublicacionSchema');
var Encuesta = require('../models/EncuestaSchema');
var UsuarioEncuesta = require('../models/UsuarioEncuestaSchema');
var Anuncio = require('../models/AnuncioSchema');
var EncuestasCounter = require('../modules/EncuestasCounter');

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
  usuario.email = req.body.email;
  usuario.esCiudadano = req.body.esCiudadano;
  usuario.fechaCreacion = req.body.fechaCreacion;
  usuario.imagen_perfil = req.body.imagen_perfil;

  usuario.save(function(err) {
    if (!err) {
      req.login(usuario, function(err) {
        if (!err) {
          res.json({message: 'Usuario registrado con exito'})
        }
      });
    } else {
      res.status(400).json({message: 'Verifique los campos'});
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
  req.logout();
  res.redirect('/');
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

router.get('/:id_usuario/encuestas', authentication.isLoggedIn, function(req, res, next) {
  var id_usuario = req.params.id_usuario;

  UsuarioEncuesta.findOne({id_usuario: id_usuario}, function(err, usuarioEncuesta) {
    if (!err) {
      if (usuarioEncuesta) {
        var usuarioEncuesta = usuarioEncuesta.toObject();
        res.json(usuarioEncuesta['encuestas']);
      } else {
        res.status(404).json({message: 'No hay encuestas completadas'});
      }
    } else {
      return next(err);
    }
  });
});

router.get('/:id_usuario/encuestas/disponibles', authentication.isLoggedIn, function(req, res, next) {
  var id_usuario = req.params.id_usuario;

  UsuarioEncuesta.findOne({id_usuario: id_usuario}, function(err, usuarioEncuestas) {
    if (!err) {
      if (usuarioEncuestas) {
        var usuarioEncuestas = usuarioEncuestas.toObject();
        var encuestasCompletadas = usuarioEncuestas['id_encuestas'];
      } else {
        var encuestasCompletadas = [];
      }
      Anuncio.find({
        id_encuesta: { $not: {$in: encuestasCompletadas } }
      }, function(err, encuestas) {
        res.json(encuestas);
      });
    } else {
        res.status(500).json({message: 'Error interno, intente de nuevo'});
    }
  });
});

router.get('/:id_usuario/encuestas/conteo', authentication.isLoggedIn, function(req, res, next) {
  EncuestasCounter.count(req, res, next);
});

router.get('/:id_usuario/encuestas/conteo/delayed', authentication.isLoggedIn, function(req, res, next) {
  var timeObject = {
    times: 0,
    max: 1 
  }

  var intervalObject = {}

  intervalObject.interval = setInterval(function() {
    EncuestasCounter.countDelayed(req, res, next, timeObject, intervalObject);
  }, 15000);
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
      res.json(usuario);
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

router.get('/candidatos', authentication.isLoggedIn, function(req, res, next) {
  Usuario.find({esCiudadano : false}, function(err, usuarios) {
    if (!err) {
      res.json(usuarios);
    } else {
      return next(err);
    }
  });
});

module.exports = router;
