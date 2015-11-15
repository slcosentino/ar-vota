define(function(require) {
  var Queja = require('frontend/models/Queja');

  return Backbone.Collection.extend({
    model: Queja,
    url: '/api/publicaciones/quejas',
    comparator: function(item) {
      return -((new Date(item.get('fechaCreacion'))).getTime());
    }
  });
});
