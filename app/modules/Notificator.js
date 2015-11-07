var UsuarioAccion = require('../models/UsuarioAccionSchema');
var EncuestaNueva = require('../models/EncuestaNuevaSchema');
var UsuarioNotificacion = require('../models/UsuarioNotificacionSchema');

module.exports = {
  start: function (req, res, next, timeObject) {
    timeObject.times++;
    if (timeObject.times > timeObject.max) {
      res.status(200).json({notificaciones: false});
    } else {
      this.check(req, res, next, timeObject);
    }
  },

  notify: function(req, res, next, notificationObject) {
    res.json(notificationObject);
  },

  check: function(req, res, next, timeObject) {
    var id_usuario = req.user.id_usuario;
    var that = this;
    var notificationObject = {};
    notificationObject.notificaciones = false;

    UsuarioAccion.findOne({id_usuario: id_usuario}, function(err, usuarioAcciones) {
      if (!err) {
        if (usuarioAcciones) {
          var usuarioAccionesObject = usuarioAcciones.toObject();
          var encuestasVistas = usuarioAccionesObject['id_encuestas_vistas'];
        } else {
          var encuestasVistas = [];
        }
        
        EncuestaNueva.count({
          id_encuesta: { $not: {$in: encuestasVistas } }
        }, function(err, conteo) {
          if (conteo > 0) {
            notificationObject.encuestasNuevas = conteo;
            notificationObject.notificaciones = true;
          }

          UsuarioNotificacion.findOne({id_usuario: id_usuario}, function(err, usuarioNotificacion) {
            if (!err) {
              var usuarioNotificacionObject = usuarioNotificacion.toObject();
              var notificacionPublicaciones = usuarioNotificacionObject['notificacion_publicaciones'];
              
              if (notificacionPublicaciones.length > 0) {
              console.log(notificacionPublicaciones);
                notificationObject.publicacionesNuevas = notificacionPublicaciones.length;
                notificationObject.notificaciones = true;
              }

              if (notificationObject.notificaciones == true) {
                that.notify(req, res, next, notificationObject);
              } else {
                setTimeout(function() {
                  that.start(req, res, next, timeObject);
                }, 15000);
              }
            }
          });
        });
      } else {
        return;
      }
    });
  }
}
