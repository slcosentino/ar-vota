var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var comentarioLikeSchema = new Schema({
  id_comentario: { type: String, required: true },
  id_usuario: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comentarioLike', comentarioLikeSchema);

var mongoose = require('mongoose');
