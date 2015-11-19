define(function(require) {
  var template = require('text!admin/templates/ver-encuestas.html'),
      Encuestas = require('admin/collections/Encuestas'),
      ItemEncuestaView = require('admin/views/ItemEncuestaView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function() {
      this.encuestas = new Encuestas();
      this.listenTo(this.encuestas, 'reset', this.renderEncuestas);

      this.$('#encuestas-status').removeClass('hidden');
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

      this.$('#encuestas-status').addClass('hidden');

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
      var itemEncuestaView = new ItemEncuestaView({
       model: item
     });

      this.$('#item-encuestas-container').append(itemEncuestaView.render().el);
    }

  });
});
