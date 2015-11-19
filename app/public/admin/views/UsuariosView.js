define(function(require) {
  var template = require('text!admin/templates/usuarios.html'),
      Usuarios = require('admin/collections/Usuarios'),
      UsuarioView = require('admin/views/UsuarioView'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function(options) {
      this.candidatos = options.candidatos;
    },

    render: function() {
      this.$el.html(this.template({
        candidatos: this.candidatos
      }));

      this.collection = new Usuarios();
      if (this.candidatos) {
        this.collection.url = this.collection.url + '/candidatos'
      }
      this.listenTo(this.collection, 'reset', this.renderCollection);

      this.$('#usuarios-status').removeClass('hidden');
      this.collection.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      return this;
    },

    renderCollection: function() {
      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);

      this.$('#usuarios-status').addClass('hidden');

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
      var usuarioView = new UsuarioView({
        model: item
      });

      this.$('#usuarios-container').append(usuarioView.render().el);
    }

  });
});
