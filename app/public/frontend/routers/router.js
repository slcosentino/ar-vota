define(function(require) {
	var ViewManager = require('frontend/helpers/ViewManager'),
	IndexView = require('frontend/views/IndexView'),
	LoginView = require('frontend/views/LoginView'),
	RecoverView = require('frontend/views/RecoverView'),
	AddPublicacionView = require('frontend/views/AddPublicacionView'),
	PropuestasOverViewView = require('frontend/views/PublicacionOverViewView'),
	PropuestasView = require('frontend/views/propuestas/PropuestasView'),
	PublicacionesView = require('frontend/views/PublicacionesView'),
	PropuestaView = require('frontend/views/propuestas/PropuestaView'),
	QuejasAddView = require('frontend/views/quejas/AddView'),
	QuejasOverView = require('frontend/views/quejas/OverView'),
	QuejasView = require('frontend/views/quejas/QuejasView'),
	QuejaView = require('frontend/views/quejas/QuejaView'),
	EnConstruccionView = require('frontend/views/EnConstruccionView'),
	RegisterView = require('frontend/views/RegisterView');

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'index': 'index',
      'login': 'login',
      'recover': 'recover',
      'register': 'register',
      'propuestasAdd': 'propuestasAdd',
      'propuestas/:id_propuesta': 'propuestasOverview',
      'propuestas': 'propuestas',
      'quejasAdd': 'quejasAdd',
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
      var propuestasOverViewView = new PropuestasOverViewView();
      propuestasOverViewView.id_publicacion = id_publicacion;
      ViewManager.render(propuestasOverViewView, $('#main-container'));
    },
    propuestas: function() {	
    //	var propuestasView = new PropuestasView();
    //    ViewManager.render(propuestasView, $('#main-container'));
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
      var quejasOverView = new QuejasOverView();
      quejasOverView.id = id_queja;
      ViewManager.render(quejasOverView, $('#main-container'));
    },
    quejas: function() {	
    //	var quejasView = new QuejasView();
     //   ViewManager.render(quejasView, $('#main-container'));
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
