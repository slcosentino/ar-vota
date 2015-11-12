define(function(require) {
  var Encuesta = require('admin/models/Encuesta');

  return Backbone.Collection.extend({
    url: '/api/encuestas/enviadas',
    model: Encuesta,
    comparator: function(item) {
      return item.id;
    }
  });
});
