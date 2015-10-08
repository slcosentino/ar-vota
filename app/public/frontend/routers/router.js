define(function(require) {
	var ViewManager = require('frontend/helpers/ViewManager'),
	IndexView = require('frontend/views/IndexView'),
	LoginView = require('frontend/views/LoginView'),
	RecoverView = require('frontend/views/RecoverView'),
	PropuestasAddView = require('frontend/views/Propuestas/AddView'),
	PropuestasOverView = require('frontend/views/Propuestas/OverView'),
	PropuestasView = require('frontend/views/Propuestas/PropuestasView'),
	PropuestaView = require('frontend/views/Propuestas/PropuestaView'),
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
      var propuestasAddView = new PropuestasAddView();
      ViewManager.render(propuestasAddView, $('#main-container'));
    },
	propuestasOverview: function(id_propuesta) {
      var propuestasOverView = new PropuestasOverView();
      propuestasOverView.id = id_propuesta;
      ViewManager.render(propuestasOverView, $('#main-container'));
    },
    propuestas: function() {	
    	var propuestasView = new PropuestasView();
        ViewManager.render(propuestasView, $('#main-container'));
    },
    enConstruccion: function() {	
    	var enConstruccionView = new EnConstruccionView();
        ViewManager.render(enConstruccionView, $('#main-container'));
    }
  });
});
