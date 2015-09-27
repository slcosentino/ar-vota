var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


//Los esquemas son las colecciones de datos
var ProvinciaCiudadSchema = new Schema({
	provincia: 		{ type: String },
	ciudades: 	    { type: Array, ciudad: {type: String}
					}   
});


module.exports = mongoose.model('ProvinciaCiudad', ProvinciaCiudadSchema);