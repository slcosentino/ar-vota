define(function(require) {
  var template = require('text!admin/templates/perfil.html'),
      Usuario = require('admin/models/Usuario'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #editar-button': 'editar',
      'click #cancelar-button': 'cancelar',
      'click #guardar-button': 'guardar'  
    },

    initialize: function(options) {
      this.verificar = options.verificar;
    },
    render: function() {
      if (this.verificar) {
        var attributes = this.model.attributes;
        attributes.verificar = true;
        this.$el.html(this.template(attributes));
      } else {
        this.model = new Usuario();
        this.model.urlRoot = '/api/usuarios/' + this.id_usuario;

        this.listenTo(this.model, 'change', this.renderModel);

        this.model.fetch({
          error: function(collection, xhr, options) {
            ErrorHelper.showError(xhr);
          }
        });
      }
      return this;
    },

    renderModel: function() {
      var attributes = this.model.attributes;
      attributes.verificar = false;
      this.$el.html(this.template(attributes));
    },

    editar: function() {
      url = '#usuarios/' + this.model.attributes.id_usuario + '/editar';
      Backbone.history.navigate(url, true); 
    },

    cancelar: function() {
      var view = this;
      this.$('.user-data').each(function(index, element) {
        var value = view.model.get($(element).attr('id'));
        $(element).html(value);
      });
    },

    guardar: function() {
      var view = this;
      this.$('.user-data').each(function(index, element) {
        //var value = view.model.set($(element).attr('id'), '');
        var value = $(element).children('input').val();
        view.model.set($(element).attr('id'), value);
        $(element).html(value);
      });

      this.model.urlRoot = '/api/usuarios/';
      this.model.save();
    }

  });
});
