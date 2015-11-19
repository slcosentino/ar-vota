define(function(require) {
  var template = require('text!admin/templates/solicitudes.html'),
      Solicitudes = require('admin/collections/Solicitudes'),
      SolicitudView = require('admin/views/SolicitudView'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function(options) {
    },

    render: function() {
      this.$el.html(this.template({
        candidatos: this.candidatos
      }));

      this.collection = new Solicitudes();

      this.listenTo(this.collection, 'reset', this.renderCollection);

      this.$('#solicitudes-status').removeClass('hidden');

      this.collection.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      return this;
    },

    renderCollection: function() {
      if (this.collection.length == 0) {
        this.$('#solicitudes-container').html('<br><h4>No hay solicitudes para mostrar</h4>');
      }
      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);

      this.$('#solicitudes-status').addClass('hidden');

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
      var solicitudView = new SolicitudView({
        model: item
      });

      this.$('#solicitudes-container').append(solicitudView.render().el);
    }

  });
});
