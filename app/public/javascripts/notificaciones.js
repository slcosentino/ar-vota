/* notificaciones */

function consultaDelayed(id_usuario) {
    $.ajax({
      method: 'GET',
      url: '/api/usuarios/'+ id_usuario + '/encuestas/conteo/delayed',
      contentType: 'application/json',
    })
    .done(
      function(data, textStatus, jqXHR) {
        if (data > 0) {
          notificar(data);
        }
        consultaDelayed(id_usuario);
        return;
    })
    .fail(function(xhr, textStatus, errorThrown) {
      $('#error-modal').find('#mensaje').html('Error interno. Intente de nuevo en unos minutos');
      $('#error-modal').modal('show');
    });
}

function consulta(id_usuario) {
  $.ajax({
    method: 'GET',
    url: '/api/usuarios/'+ id_usuario + '/encuestas/conteo',
    contentType: 'application/json',
  })
  .done(
    function(data, textStatus, jqXHR) {
      if (data > 0) {
       notificar(data);
      } else {
        $('#notificaciones').html('');
      }
  })
  .fail(function(xhr, textStatus, errorThrown) {
    $('#error-modal').find('#mensaje').html('Error interno. Intente de nuevo en unos minutos');
    $('#error-modal').modal('show');
  });

  consultaDelayed(id_usuario);
}

function notificar(data) {
  $('#notificaciones').addClass('badge badge-encuestas');
  $('#notificaciones').html(data);
}
