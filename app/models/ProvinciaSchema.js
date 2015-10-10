var mongoose = require('mongoose');

var ProvinciaSchema = new mongoose.Schema({
  provincia: { type: String },
	ciudades:  [{ 
    ciudad: {type: String}
  }]
});

module.exports = mongoose.model('Provincia', ProvinciaSchema);
