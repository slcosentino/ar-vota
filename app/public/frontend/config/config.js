require.config({
  baseUrl: '/',
  paths: {
    'text': 'javascripts/lib/text'
  }
});

require(['frontend/routers/router'], function(Router) {
  Backbone.View.prototype.close = function() {
    if (this.onClose) {
      this.onClose();
    }
    this.remove();
  }

  var router = new Router();
  Backbone.history.start();
});
