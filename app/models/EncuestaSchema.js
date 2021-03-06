var mongoose = require('mongoose');

var EncuestaSchema = new mongoose.Schema({
    topico: { type: String, required: true},
    titulo: { type: String, required: true},
    fechaCreacion: { type: Date },
    fechaModificacion: { type: Date, default: Date.now },
    enviada: {type: Boolean, default: false},
    preguntas: [{
      _id: false,
      nro_pregunta: { type: Number },
      texto: { type: String, required: true},
      respuestas: [{
        _id: false,
        nro_respuesta: { type: Number },
        texto: { type: String, required: true},
        seleccionada: {type: Boolean, default: false}
      }]
    }],
});

module.exports = mongoose.model('Encuesta', EncuestaSchema);
