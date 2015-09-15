define(function(require) {
  var Respuesta = require('admin/models/Respuesta');

  return Backbone.Collection.extend({
    model: Respuesta
  });
});
