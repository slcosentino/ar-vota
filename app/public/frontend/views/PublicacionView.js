define(function(require) {
  var template = require('text!frontend/templates/publicacion.html'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    tagName: 'article',
    className: 'white-panel',
    template: _.template(template),
    events: {
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
	  
      this.formatDate();
      
      return this;
    },
	
	formatDate: function() {
	  $(".fecha").each(function( index, value ) {
	    $(value).html( $.format.date ( new Date ($(value).html()), 'dd-MMM-yyyy hh:mm'))
	  });
	}
  });
});
