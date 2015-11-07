define(function() {
  return Backbone.Model.extend({
    parse: function(response) {
      response.id = response._id;
      return response;
    }
  });
});
