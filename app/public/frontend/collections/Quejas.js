define(function(require) {
  var Queja = require('frontend/models/Queja');

  return Backbone.Collection.extend({
    model: Queja,
    url: '/api/quejas'
  });
});
