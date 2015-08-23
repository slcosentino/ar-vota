define(function(require) {
  return ErrorHelper = {
    showError: function(xhr) {
      var errorObject = $.parseJSON(xhr.responseText);

      $('#error-modal').find('#mensaje').html(errorObject.message);
      $('#error-modal').modal('show');
    }
  }
});
