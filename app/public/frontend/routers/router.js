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
  EncuestasDisponiblesView = require('frontend/views/EncuestasDisponiblesView'),
  CompletarEncuestaView = require('frontend/views/CompletarEncuestaView'),
  PropuestasNuevasView = require('frontend/views/PropuestasNuevasView')
  VerificacionView = require('frontend/views/VerificacionView'),
  CambiarImagenView = require('frontend/views/CambiarImagenView');

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'index': 'index',
      'login': 'login',
      'recover': 'recover',
      'register': 'register',
      'propuestas/nueva': 'propuestasAdd',
      'publicaciones/nuevas': 'verPropuestasNuevas',
      'propuestas/recientes': 'propuestasRecientes',
      'propuestas/populares': 'propuestasPopulares',
      'propuestas/:id_propuesta': 'propuestasOverview',
      'quejas/nueva': 'quejasAdd',
      'quejas/recientes': 'quejasRecientes',
      'quejas/populares': 'quejasPopulares',
      'quejas/:id_queja': 'quejasOverview',
      'usuarios/imagen': 'cambiarImagenPerfil',
      'usuarios/:id_usuario': 'perfil',
      'encuestas/disponibles': 'verEncuestasDisponibles',
      'encuestas/nuevas': 'verEncuestasNuevas',
      'encuestas/:id_encuesta/completar': 'completarEncuesta',
      'verificacion': 'verificacion'
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
    propuestasOverview: function(id_propuesta) {
      var publicacionOverViewView = new PublicacionOverViewView();
      publicacionOverViewView.id_publicacion = id_propuesta;
      ViewManager.render(publicacionOverViewView, $('#main-container'));
    },
    propuestasRecientes: function() {  
      var publicacionesView = new PublicacionesView({
        propuestas: true,
        populares: false
      });
      ViewManager.render(publicacionesView, $('#main-container'));
    },
    propuestasPopulares: function() {  
      var publicacionesView = new PublicacionesView({
        propuestas: true,
        populares: true
      });
      ViewManager.render(publicacionesView, $('#main-container'));
    },
    quejasAdd: function() {
      var addPublicacionView = new AddPublicacionView();
      addPublicacionView.propuesta = false;
      ViewManager.render(addPublicacionView, $('#main-container'));
    },
    quejasOverview: function(id_queja) {
      var publicacionOverViewView = new PublicacionOverViewView();
      publicacionOverViewView.id_publicacion = id_queja;
      ViewManager.render(publicacionOverViewView, $('#main-container'));
    },
    quejasRecientes: function() {  
      var publicacionesView = new PublicacionesView({
        propuestas: false,
        populares: false
      });
      ViewManager.render(publicacionesView, $('#main-container'));
    },
    quejasPopulares: function() {  
      var publicacionesView = new PublicacionesView({
        propuestas: false,
        populares: true
      });
      ViewManager.render(publicacionesView, $('#main-container'));
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
    verEncuestasDisponibles: function() {
      var encuestasDisponiblesView = new EncuestasDisponiblesView({
        nuevas: false
      });
      ViewManager.render(encuestasDisponiblesView, $('#main-container'));
    },
    verEncuestasNuevas: function() {
      var encuestasDisponiblesView = new EncuestasDisponiblesView({
        nuevas: true
      });
      ViewManager.render(encuestasDisponiblesView, $('#main-container'));
    },
    completarEncuesta: function(id_encuesta) {
      var completarEncuestaView = new CompletarEncuestaView({
        id_encuesta: id_encuesta
      });
      ViewManager.render(completarEncuestaView, $('#main-container'));
    },
    verPropuestasNuevas: function() {
      var propuestasNuevasView = new PropuestasNuevasView();
      ViewManager.render(propuestasNuevasView, $('#main-container'));
    },
    verificacion: function() {
      var verificacionView = new VerificacionView();
      ViewManager.render(verificacionView, $('#main-container'));
    },
    cambiarImagenPerfil: function() {
      var cambiarImagenView = new CambiarImagenView();
      ViewManager.render(cambiarImagenView, $('#main-container'));
    }
  });
});
