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

    editar: function() {
      this.$('.user-data').each(function(index, element) {
        var previousValue = $(element).html();
        $(element).html('<input type="text" class="form-control" id="nombre" value="' + previousValue + '">');
      });

      this.$('#ui-container').html(' \
        <button id="guardar-button" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Guardar</button> \
        <button id="cancelar-button" type="button" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span> Cancelar</button> \
      ');
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
