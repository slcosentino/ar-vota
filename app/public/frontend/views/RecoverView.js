define(function(require) {
  var template = require('text!frontend/templates/recover.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
   // events: {
   //   'click #login-button': 'login'
   // },

    render: function() {	
      this.$el.html(this.template);
      return this;
    }  
    
  });
});
