define(function(require) {
  var Pregunta = require('admin/models/Pregunta');

  return Backbone.Collection.extend({
    model: Pregunta,
    comparator: function(item) {
      return item.index;
    }
  });
});
