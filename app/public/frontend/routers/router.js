define(function(require) {
	var ViewManager = require('frontend/helpers/ViewManager'),
	LoginView = require('frontend/views/LoginView'),
	RecoverView = require('frontend/views/RecoverView'),
	PropuestasView = require('frontend/views/PropuestasView'),
	RegisterView = require('frontend/views/RegisterView');;

  return Backbone.Router.extend({
    routes: {
	  'login': 'login',
	  'recover': 'recover',
	  'register': 'register',
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
	propuestas: function() {
      var propuestasView = new PropuestasView();
      ViewManager.render(propuestasView, $('#main-container'));
    }
  });
});
