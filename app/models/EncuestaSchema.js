var mongoose = require('mongoose');

var EncuestaSchema = new mongoose.Schema({
    topico: { type: String, required: true },
    fechaCreacion: { type: Date },
    fechaModificacion: { type: Date, default: Date.now },
    preguntas: [{
      nro_pregunta: { type: Number, required: true },
      texto: { type: String, required: true},
      respuestas: [{
        nro_respuesta: { type: Number, required: true},
        texto: { type: String, required: true},
        seleccionada: {type: Boolean, default: false}
      }]
    }],
});

module.exports = mongoose.model('Encuesta', EncuestaSchema);
