define(function(require) {
  var template = require('text!admin/templates/envio-encuesta.html'),
      ErrorHelper = require('admin/helpers/ErrorHelper'),
      SuccessHelper = require('helpers/SuccessHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #enviar-button': 'enviar'
    },

    initialize: function(options){
      this.id_encuesta = options.id_encuesta;
    },

    render: function() {
      this.$el.html(this.template(this.id_encuesta));
      return this;
    },

    enviar: function(event) {
      event.preventDefault();
      this.$('#confirmar-status').removeClass('hidden');

      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/encuestas/nuevas',
        contentType: 'application/json',
        data: JSON.stringify({
          'id_encuesta': this.id_encuesta
        })
      })
      .done(
        function(data, textStatus, jqXHR) {
          view.$('#status').html('<span class="text-success">Encuesta enviada con éxito ' + '<span class="glyphicon glyphicon-ok"></span></span>');
          view.$('#confirmar-status').addClass('hidden');
          SuccessHelper.show('Encuesta enviada con éxito!');
          view.$('#enviar-button').addClass('disabled');
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    }
  });
});
