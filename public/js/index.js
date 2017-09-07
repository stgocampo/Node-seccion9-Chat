var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('Nuevo mensaje',message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">Mi ubicación actual</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  $("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $("[name=message]").val()
  }, function() {
    $("[name=message]").val(String());
  });
});

var botonlocacion = $("#enviarLocalizacion");
botonlocacion.on("click", function(e) {
  e.preventDefault();

  if (!navigator.geolocation) {
    return alert('Gelocation no es soportado por su navegador');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('No se puede encontrar la locación')
  })
});
