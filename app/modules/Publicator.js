var Publicacion = require('../models/PublicacionSchema');
var UsuarioNotificacion = require('../models/UsuarioNotificacionSchema');
var UsuarioSeguidor = require('../models/UsuarioSeguidorSchema');

module.exports = {
  propuesta: function (req, res, next) {
    this.publish(req, res, next, true);
  },

  queja: function(req, res, next) {
    this.publish(req, res, next, false);
  },

  publish: function (req, res, next, propuesta) {
    var publicacion = new Publicacion();
    var id = req.params.id;
    var id_usuario = req.user.id_usuario;

    publicacion.id_usuario = req.user.id_usuario;
    publicacion.titulo = req.body.titulo;
    publicacion.descripcion = req.body.descripcion;
    publicacion.propuesta = propuesta;
    publicacion.imagen = req.body.imagen;

    publicacion.save(function(err, publicacion) {
      if (!err) {
        /* crear notificacion para cada seguidor */
        UsuarioSeguidor.findOne({id_usuario: id_usuario}, function(err, usuarioSeguidor) {
          if (err) {
            res.status(500).json({message: 'Intente de nuevo'});
            return;
          }
          usuarioSeguidor.id_seguidores.forEach(function(id_seguidor, index){
            UsuarioNotificacion.findOneAndUpdate(
              {id_usuario: id_seguidor},
              {
                $addToSet: {
                  notificacion_publicaciones: {
                    id_candidato: id_usuario,
                    id_objeto: publicacion._id,
                    titulo: publicacion.titulo
                  }
                }
              },
              function(err, usuarioNotificacion) {
                if (err) {
                  res.status(500).json({message: 'Intente de nuevo'});
                }
              });
          });
        });
        res.json({message: 'Publicacion creada con exito'});
      } else {
        res.status(400).json({message: 'Verifique los campos'});
      }
    });
  }
}
