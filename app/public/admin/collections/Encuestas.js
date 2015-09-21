define(function(require) {
  var Encuesta = require('admin/models/Encuesta');

  return Backbone.Collection.extend({
    url: '/api/encuestas',
    model: Encuesta,
    comparator: function(item) {
      return item.id;
    }
  });
});
