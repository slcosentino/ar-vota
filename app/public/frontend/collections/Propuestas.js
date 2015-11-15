define(function(require) {
  var Propuesta = require('frontend/models/Propuesta');

  return Backbone.Collection.extend({
    model: Propuesta,
    url: '/api/publicaciones/propuestas',
    comparator: function(item) {
      return -((new Date(item.get('fechaCreacion'))).getTime());
    }
  });
});
