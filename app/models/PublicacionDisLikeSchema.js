var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var publicacionDisLikeSchema = new Schema({
  id_publicacion: { type: String, required: true },
  id_usuario: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('publicacionDisLike', publicacionDisLikeSchema);

var mongoose = require('mongoose');
