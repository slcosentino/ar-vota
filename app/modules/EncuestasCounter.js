var UsuarioEncuesta = require('../models/UsuarioEncuestaSchema');
var Anuncio = require('../models/AnuncioSchema');

module.exports = {
  count: function (req, res, next, timeObject, intervalObject) {
    this.doCount(req, res, next, timeObject, intervalObject, false)
  },

  countDelayed: function (req, res, next, timeObject, intervalObject) {
    if (res.headersSent) {
      clearInterval(intervalObject.interval);
      return;
    }

    timeObject.times++;
    if (timeObject.times > timeObject.max) {
      clearInterval(intervalObject.interval);
      res.status(200).json(0);
    } else {
      this.doCount(req, res, next, timeObject, intervalObject, true)
    }
  },

  doCount: function(req, res, next, timeObject, intervalObject, delayed) {
    var id_usuario = req.params.id_usuario;


    UsuarioEncuesta.findOne({id_usuario: id_usuario}, function(err, usuarioEncuestas) {
      if (!err) {
        if (usuarioEncuestas) {
          var usuarioEncuestas = usuarioEncuestas.toObject();
          var encuestasCompletadas = usuarioEncuestas['id_encuestas'];
        } else {
          var encuestasCompletadas = [];
        }

        Anuncio.count({
          id_encuesta: { $not: {$in: encuestasCompletadas } }
        }, function(err, conteo) {
          if (delayed) {
            if (conteo > 0) {
              res.json(conteo);
            }
          } else {
            res.json(conteo);
          }
        });
      } else {
        res.status(500).json({message: 'Error interno, intente de nuevo'});
      }
    });

  }
}
