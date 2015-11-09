var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var publicacionLikeSchema = new Schema({
  id_publicacion: { type: String, required: true },
  id_usuario: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('publicacionLike', publicacionLikeSchema);

var mongoose = require('mongoose');
