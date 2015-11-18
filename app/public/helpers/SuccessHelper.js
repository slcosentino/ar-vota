define(function(require) {
  return SuccessHelper = {
    show: function(msg) {
      $('#success-modal').find('#mensaje').html(msg);
      $('#success-modal').modal('show');
    }
  }
});
