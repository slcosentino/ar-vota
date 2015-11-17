define(function(require) {
  var template = require('text!frontend/templates/verificacion.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },
	
    render: function() {	
      this.$el.html(this.template);
      return this;
    }
    
  });
});
