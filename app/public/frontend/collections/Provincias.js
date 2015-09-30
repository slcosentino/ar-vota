define(function(require) {
  var Provincia = require('frontend/models/Provincia');  

  return Backbone.Collection.extend({
    url: 'api/propuestas/provinciasCiudades',
    model: Provincia	 
  });
});
