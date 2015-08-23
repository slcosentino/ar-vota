define(function(require) {
  var ViewManager = require('admin/helpers/ViewManager'),
      UsuariosView = require('admin/views/UsuariosView');

  return Backbone.Router.extend({
    routes: {
      'usuarios': 'usuarios'
    },

    usuarios: function() {
      var usuariosView = new UsuariosView();
      ViewManager.render(usuariosView, $('#main-container'));
    }
  });
});
