var Publicacion = require('../models/PublicacionSchema');

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

    publicacion.id_usuario = req.user.id_usuario;
    publicacion.titulo = req.body.titulo;
    publicacion.descripcion = req.body.descripcion;
    publicacion.propuesta = propuesta;
    publicacion.imagen = req.body.imagen;

    publicacion.save(function(err) {
      if (!err) {
        res.json({message: 'Publicacion creada con exito'})
      } else {
        res.status(400).json({message: 'Verifique los campos'});
      }
    });
  }
}
