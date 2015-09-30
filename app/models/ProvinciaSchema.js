var mongoose = require('mongoose');

//Los esquemas son las colecciones de datos
var ProvinciaSchema = new mongoose.Schema({
	provincia: 		{ type: String },
	ciudades: 	    { type: Array, ciudad: {type: String}
					}   
});


module.exports = mongoose.model('Provincia', ProvinciaSchema);