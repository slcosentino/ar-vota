var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    type: { type: String},
	  data: { type: Buffer }
	});

module.exports = mongoose.model('Image', ImageSchema);
