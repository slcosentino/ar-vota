define(function(require) {
  var ViewManager = require('frontend/helpers/ViewManager'),
  IndexView = require('frontend/views/IndexView'),
  LoginView = require('frontend/views/LoginView'),
  RecoverView = require('frontend/views/RecoverView'),
  AddPublicacionView = require('frontend/views/AddPublicacionView'),
  PublicacionOverViewView = require('frontend/views/PublicacionOverViewView'),
  PublicacionesView = require('frontend/views/PublicacionesView'),
  RegisterView = require('frontend/views/RegisterView'),
  PerfilView = require('frontend/views/PerfilView'),
  EncuestasView = require('frontend/views/EncuestasView'),
  EncuestasDisponiblesView = require('frontend/views/EncuestasDisponiblesView'),
  CompletarEncuestaView = require('frontend/views/CompletarEncuestaView');

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'index': 'index',
      'login': 'login',
      'recover': 'recover',
      'register': 'register',
      'propuestas/nueva': 'propuestasAdd',
      'propuestas/:id_propuesta': 'propuestasOverview',
      'propuestas': 'propuestas',
      'quejas/nueva': 'quejasAdd',
      'quejas/:id_queja': 'quejasOverview',
      'quejas': 'quejas',
      'usuarios/:id_usuario': 'perfil',
      'usuarios/:id_usuario/encuestas': 'verEncuestas',
      'usuarios/:id_usuario/encuestas/disponibles': 'verEncuestasDisponibles',
      'usuarios/:id_usuario/encuestas/nuevas': 'verEncuestasNuevas',
      'encuestas/:id_encuesta/completar': 'completarEncuesta'
    },
    index: function() {
        var indexView = new IndexView();
        ViewManager.render(indexView, $('#main-container'));
    },
    login: function() {
      var loginView = new LoginView();
      ViewManager.render(loginView, $('#main-container'));
    },
    register: function() {
      var registerView = new RegisterView();
      ViewManager.render(registerView, $('#main-container'));
    },
    recover: function() {
      var recoverView = new RecoverView();
      ViewManager.render(recoverView, $('#main-container'));
    },
    propuestasAdd: function() {
      var addPublicacionView = new AddPublicacionView();
      addPublicacionView.propuesta = true;
      ViewManager.render(addPublicacionView, $('#main-container'));
    },
    propuestasOverview: function(id_publicacion) {
      var publicacionOverViewView = new PublicacionOverViewView();
      publicacionOverViewView.id_publicacion = id_publicacion;
      ViewManager.render(publicacionOverViewView, $('#main-container'));
    },
    propuestas: function() {  
      var publicacionesView = new PublicacionesView();
      publicacionesView.propuestas = true;
      ViewManager.render(publicacionesView, $('#main-container'));
    },
    quejasAdd: function() {
      var addPublicacionView = new AddPublicacionView();
      addPublicacionView.propuesta = false;
      ViewManager.render(addPublicacionView, $('#main-container'));
    },
    quejasOverview: function(id_queja) {
      var publicacionOverViewView = new PublicacionOverViewView();
      publicacionOverViewView.id_publicacion = id_publicacion;
      ViewManager.render(publicacionOverViewView, $('#main-container'));
    },
    quejas: function() {  
      var publicacionesView = new PublicacionesView();
      publicacionesView.propuestas = false;
      ViewManager.render(publicacionesView, $('#main-container'));
    },
    perfil: function(id_usuario) {
      var perfilView = new PerfilView();
      perfilView.id_usuario = id_usuario;
      ViewManager.render(perfilView, $('#main-container'));
    },
    verEncuestas: function(id_usuario) {
      var encuestasView = new EncuestasView({
        id_usuario: id_usuario
      });
      ViewManager.render(encuestasView, $('#main-container'));
    },

    verEncuestasDisponibles: function(id_usuario) {
      var encuestasDisponiblesView = new EncuestasDisponiblesView({
        id_usuario: id_usuario,
        nuevas: false
      });
      ViewManager.render(encuestasDisponiblesView, $('#main-container'));
    },

    verEncuestasNuevas: function(id_usuario) {
      var encuestasDisponiblesView = new EncuestasDisponiblesView({
        id_usuario: id_usuario,
        nuevas: true
      });
      ViewManager.render(encuestasDisponiblesView, $('#main-container'));
    },

    completarEncuesta: function(id_encuesta) {
      var completarEncuestaView = new CompletarEncuestaView({
        id_encuesta: id_encuesta
      });
      ViewManager.render(completarEncuestaView, $('#main-container'));
    }
  });
});
