/* notificaciones */
notificaciones = {};

$(document).ready(function() {
  notificaciones.consultar();
});

notificaciones.consultar = function() {
  $.ajax({
    method: 'GET',
    url: '/api/notificaciones/',
    contentType: 'application/json',
  })
  .done(function(data, textStatus, jqXHR) {
    if (data.notificaciones == true) {
      if (data.encuestasNuevas) {
        notificaciones.encuestasNuevas = data.encuestasNuevas;
        notificaciones.notificar();
      }
    }
    if (data.notificaciones == false) {
      notificaciones.limpiarNotificaciones();
    }

    setTimeout(function() {
      notificaciones.consultar();
    }, 15000);
  })
  .fail(function(xhr, textStatus, errorThrown) {
    setTimeout(function() {
      notificaciones.consultar();
    }, 15000);
  });
}

notificaciones.notificar = function(data) {
  $('#notificaciones').addClass('badge badge-encuestas');
  $('#notificaciones').html(notificaciones.encuestasNuevas);

  $('#notificacion-encuesta').addClass('badge');
  $('#notificacion-encuesta').html(notificaciones.encuestasNuevas);
}

notificaciones.actualizarLocal = function() {
  notificaciones.encuestasNuevas = notificaciones.encuestasNuevas -1;
  console.log('actualizarLocal');
  if (notificaciones.encuestasNuevas == 0) {
  console.log('hay 0');
    notificaciones.limpiarNotificaciones();
  } else {
  console.log('hay n');
    notificaciones.notificar();
  }
}

notificaciones.limpiarNotificaciones = function() {
  $('#notificaciones').removeClass('badge badge-encuestas');
  $('#notificaciones').html('');

  $('#notificacion-encuesta').removeClass('badge');
  $('#notificacion-encuesta').html('');
}
