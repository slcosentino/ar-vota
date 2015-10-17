define(function(require) {
  var template = require('text!admin/templates/envio-encuesta.html'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

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

      this.$('#status').html('Procesando...');

      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/encuestas/anuncios',
        contentType: 'application/json',
        data: JSON.stringify({
          'id_encuesta': this.id_encuesta
        })
      })
      .done(
        function(data, textStatus, jqXHR) {
          view.$('#status').html('<span class="text-success">Encuesta enviada con éxito ' + '<span class="glyphicon glyphicon-ok"></span></span>');
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    }
  });
});
