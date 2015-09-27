define(function(require) {
  var ProvinciaCiudad = require('frontend/models/ProvinciaCiudad');

  return Backbone.Collection.extend({
    url: 'api/usuarios/provinciasCiudades',
    model: ProvinciaCiudad
  });
});
