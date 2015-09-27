define(function(require) {
	var ViewManager = require('frontend/helpers/ViewManager'),
	LoginView = require('frontend/views/LoginView'),
	RecoverView = require('frontend/views/RecoverView'),
	PropuestasAddView = require('frontend/views/Propuestas/AddView'),
	PropuestasOverView = require('frontend/views/Propuestas/OverView'),
	PropuestasView = require('frontend/views/Propuestas/PropuestasView'),
	PropuestaView = require('frontend/views/Propuestas/PropuestaView'),
	RegisterView = require('frontend/views/RegisterView');

  return Backbone.Router.extend({
    routes: {
	  'login': 'login',
	  'recover': 'recover',
	  'register': 'register',
	  'propuestasAdd': 'propuestasAdd',
	  'propuestasOverview': 'propuestasOverview',
	  'propuestas': 'propuestas'
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
 	propuestasOverview: function() {
      var propuestasOverView = new PropuestasOverView();
      propuestasOverView._id = "5600550306b736d052bc6097";
      ViewManager.render(propuestasOverView, $('#main-container'));
    },
    propuestas: function() {	
    	var propuestasView = new PropuestasView();
        ViewManager.render(propuestasView, $('#main-container'));
    }
  });
});
