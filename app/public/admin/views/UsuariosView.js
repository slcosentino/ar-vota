define(function(require) {
  var template = require('text!admin/templates/usuarios.html'),
      Usuarios = require('admin/collections/Usuarios'),
      UsuarioView = require('admin/views/UsuarioView');

  return Backbone.View.extend({
    template: _.template(template),

    render: function() {
      this.$el.html(this.template());

      this.collection = new Usuarios();
      this.listenTo(this.collection, 'reset', this.renderCollection);


      this.collection.fetch({
        reset: true
      });
      return this;
    },

    renderCollection: function() {
      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);
    },

    renderItem: function(item) {
      var usuarioView = new UsuarioView({
        model: item
      });

      this.$('#usuarios-container').append(usuarioView.render().el);
    }

  });
});
