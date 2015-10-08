define(function(require) {
  var template = require('text!frontend/templates/Propuestas/add.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #publish-button': 'publish'
    },
	
    render: function() {
		this.$el.html(this.template);
		return this;
    },
	
	publish: function(event) {
		event.preventDefault();
		view = this;
		$.ajax({
			method: 'POST',
			url: '/api/propuestas/',
			contentType: 'application/json',
			data: JSON.stringify({
			'id_usuario': view.$('#id_usuario').val(),
			'titulo': view.$('#titulo').val(),
			'descripcion': view.$('#descripcion').val()})
		})
		.done(
		function(data, textStatus, jqXHR) {
			window.location.replace('/');
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
		  ErrorHelper.showError(jqXHR);
		});
	}
  });
});
