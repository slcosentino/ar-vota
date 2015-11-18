define(function(require) {
  var template = require('text!frontend/templates/verificacion.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper'),
      SuccessHelper = require('helpers/SuccessHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #solicitar-button': 'solicitar'
    },
	
    render: function() {	
      this.$el.html(this.template);
      return this;
    },

    solicitar: function(event) {
      event.preventDefault();
      this.$('#solicitar-status').removeClass('hidden');

      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/usuarios/verificaciones/solicitar',
        contentType: 'application/json',
        data: JSON.stringify({
          'telefono': view.$('#telefono-input').val(),
          'social': view.$('#social-input').val()})
      })
      .done(
        function(data, textStatus, jqXHR) {
          SuccessHelper.show('Solicitud enviada con éxito!');
          view.$('#solicitar-status').addClass('hidden');
          view.$('#solicitar-button').addClass('disabled');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          view.$('#solicitar-status').addClass('hidden');
          ErrorHelper.showError(jqXHR);
        });
    }
    
  });
});
