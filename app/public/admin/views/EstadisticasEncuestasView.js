define(function(require) {
  var template = require('text!admin/templates/estadisticas-encuestas.html'),
      EncuestasEnviadas = require('admin/collections/EncuestasEnviadas'),
      ItemEncuestaEnviadaView = require('admin/views/ItemEncuestaEnviadaView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function() {
      this.encuestas = new EncuestasEnviadas();
      this.listenTo(this.encuestas, 'reset', this.renderEncuestas);

      this.encuestas.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    renderEncuestas: function() {
      this.encuestas.each(function(item) {
        this.renderItem(item);
      }, this);

      /* filtro */
      var filas = this.$('#tabla tr');
      this.$('#filtrar-input').keyup(function() {
        var valor = $.trim($(this).val()).replace(/ +/g, '').toLowerCase();

        filas.show().filter(function() {
          var texto = $(this).text().replace(/\s+/g,'').toLowerCase();
          return !~texto.indexOf(valor);
        }).hide();
      });
    },

    renderItem: function(item) {
      var itemEncuestaEnviadaView = new ItemEncuestaEnviadaView({
       model: item
     });

      this.$('#item-encuestas-container').append(itemEncuestaEnviadaView.render().el);
    }

  });
});
