define(function(require) {
  var Pregunta = require('admin/models/Pregunta');

  return Backbone.Collection.extend({
    model: Pregunta
/*    url: '/api/encuestas',
  save: function() {
    Backbone.sync('create', this, {
      success: function() {
        console.log('saved');
      }
    });
  }*/
  });
});
