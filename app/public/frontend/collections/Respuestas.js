define(function(require) {
  var Respuesta = require('frontend/models/Respuesta');

  return Backbone.Collection.extend({
    model: Respuesta
  });
});
