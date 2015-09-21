var mongoose = require('mongoose');

var TopicoSchema = new mongoose.Schema({
  texto: { type: String }
});

module.exports = mongoose.model('Topico', TopicoSchema);
