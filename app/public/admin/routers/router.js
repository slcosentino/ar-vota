define(function(require) {
  var ViewManager = require('admin/helpers/ViewManager'),
      UsuariosView = require('admin/views/UsuariosView'),
      LoginView = require('admin/views/LoginView'),
      InicioView = require('admin/views/InicioView'),
      BienvenidaView = require('admin/views/BienvenidaView');

  return Backbone.Router.extend({
    routes: {
      '' : 'bienvenida',
      'inicio': 'inicio',
      'usuarios': 'usuarios',
      'login': 'login'
    },

    bienvenida: function() {
      var bienvenidaView = new BienvenidaView();
      ViewManager.render(bienvenidaView, $('#main-container'));
    },

    inicio: function() {
      var inicioView = new InicioView();
      ViewManager.render(inicioView, $('#main-container'));
    },

    usuarios: function() {
      var usuariosView = new UsuariosView();
      ViewManager.render(usuariosView, $('#main-container'));
    },

    login: function() {
      var loginView = new LoginView();
      ViewManager.render(loginView, $('#main-container'));
    }
  });
});
