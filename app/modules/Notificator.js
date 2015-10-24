var UsuarioAccion = require('../models/UsuarioAccionSchema');
var EncuestaNueva = require('../models/EncuestaNuevaSchema');

module.exports = {
  start: function (req, res, next, timeObject) {
    timeObject.times++;
    if (timeObject.times > timeObject.max) {
      res.status(200).json({notificaciones: false});
    } else {
      this.encuestasNuevas(req, res, next, timeObject);
    }
  },

  notify: function(req, res, next, notificationObject) {
    notificationObject.notificaciones = true;
    res.json(notificationObject);
  },

  encuestasNuevas: function(req, res, next, timeObject) {
    var id_usuario = req.user.id_usuario;
    var that = this;

    UsuarioAccion.findOne({id_usuario: id_usuario}, function(err, usuarioAcciones) {
      if (!err) {
        if (usuarioAcciones) {
          var usuarioAccionesObject = usuarioAcciones.toObject();
          var encuestasVistas = usuarioAccionesObject['id_encuestas_vistas']
        } else {
          var encuestasVistas = [];
        }
        
        EncuestaNueva.count({
          id_encuesta: { $not: {$in: encuestasVistas } }
        }, function(err, conteo) {
          if (conteo > 0) {
            var notificationObject = {};
            notificationObject.encuestasNuevas = conteo;
            that.notify(req, res, next, notificationObject);
          } else {
            setTimeout(function() {
              that.start(req, res, next, timeObject);
            }, 15000);
          }
        });
        
      } else {
        return;
      }
    });
  }
}
