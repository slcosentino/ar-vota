define(function(require) {
	var ViewManager = require('frontend/helpers/ViewManager'),
	IndexView = require('frontend/views/IndexView'),
	LoginView = require('frontend/views/LoginView'),
	RecoverView = require('frontend/views/RecoverView'),
	AddPublicacionView = require('frontend/views/AddPublicacionView'),
	PublicacionOverViewView = require('frontend/views/PublicacionOverViewView'),
	PublicacionesView = require('frontend/views/PublicacionesView'),
	EnConstruccionView = require('frontend/views/EnConstruccionView'),
	RegisterView = require('frontend/views/RegisterView');

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
      'enConstruccion': 'enConstruccion',
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
    enConstruccion: function() {	
    	var enConstruccionView = new EnConstruccionView();
        ViewManager.render(enConstruccionView, $('#main-container'));
    }
  });
});
