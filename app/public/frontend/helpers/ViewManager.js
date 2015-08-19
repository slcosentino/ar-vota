define(function() {
  return ViewManager = {
    render: function(view, container) {
      if (this.currentView) {
        this.currentView.close();
      }

      this.currentView = view;
      container.html(view.render().$el);
    }
  }
});
