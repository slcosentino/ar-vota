define(function(require) {
  var template = require('text!admin/templates/editar-perfil.html'),
      Usuario = require('admin/models/Usuario'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #cancelar-button': 'cancelar',
      'click #guardar-button': 'guardar'
    },

    render: function() {
      this.model = new Usuario();
      this.model.urlRoot = '/api/usuarios/' + this.id_usuario;

      this.listenTo(this.model, 'change', this.renderModel);

      this.model.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      return this;
    },

    renderModel: function() {
      this.$el.html(this.template(this.model.attributes));
    },

   cancelar: function() {
      Backbone.history.history.back();
   },

    guardar: function() {
      var view = this;
      this.$('.user-data').each(function(index, element) {
       var value = $(element).val();
        view.model.set($(element).attr('id'), value);
      });

      var valor = $('input:radio[name=estadoRadios]:checked').val();
      if (valor === 'desactivado') {
        this.model.set('desactivado', true);
      }
      if (valor === 'activo') {
        this.model.set('desactivado', false);
      }

      this.model.urlRoot = '/api/usuarios/';

      var xhr = this.model.save(null, {
        success: function() {
          Backbone.history.history.back();
        },
        error: function() {
          ErrorHelper.showError(xhr);
        }
      });
    }

  });
});
