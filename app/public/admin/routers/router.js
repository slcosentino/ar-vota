define(function(require) {
  var ViewManager = require('admin/helpers/ViewManager'),
      UsuariosView = require('admin/views/UsuariosView'),
      LoginView = require('admin/views/LoginView'),
      InicioView = require('admin/views/InicioView'),
      BienvenidaView = require('admin/views/BienvenidaView'),
      PerfilView = require('admin/views/PerfilView'),
      EditarPerfilView = require('admin/views/EditarPerfilView'),
      CrearEncuestaView = require('admin/views/CrearEncuestaView');

  return Backbone.Router.extend({
    routes: {
      '' : 'bienvenida',
      'inicio': 'inicio',
      'usuarios': 'usuarios',
      'login': 'login',
      'usuarios/:id_usuario': 'perfil',
      'usuarios/:id_usuario/editar': 'editar',
      'encuestas/crear': 'crearEncuesta'
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
    },

    perfil: function(id_usuario) {
      var perfilView = new PerfilView();
      perfilView.id_usuario = id_usuario;
      ViewManager.render(perfilView, $('#main-container'));
    },

    editar: function(id_usuario) {
      var editarPerfilView = new EditarPerfilView();
      editarPerfilView.id_usuario = id_usuario;
      ViewManager.render(editarPerfilView, $('#main-container'));     
    },

    crearEncuesta: function() {
      var crearEncuestaView = new CrearEncuestaView();
      ViewManager.render(crearEncuestaView, $('#main-container'));
    }

  });
});
