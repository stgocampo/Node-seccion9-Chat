var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var fechaFormateada = moment(message.createdAt).format('h:mm a')
  var li = $('<li></li>');
  li.text(`${message.from} ${fechaFormateada}: ${message.text}`);
  $("#messages").append(li);
});

socket.on('newLocationMessage', function(message) {
  var fechaFormateada = moment(message.createdAt).format('h:mm a')
  var li = $('<li></li>');
  var a = $('<a target="_blank">Mi ubicación actual</a>');
  li.text(`${message.from} ${fechaFormateada}: `);
  a.attr('href', message.url);

  li.append(a);
  $("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();

  var messageTextBox = $("[name=message]");

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val(String());
  });
});

var botonlocacion = $("#enviarLocalizacion");
botonlocacion.on("click", function(e) {
  e.preventDefault();

  if (!navigator.geolocation) {
    return alert('Gelocation no es soportado por su navegador');
  }

  botonlocacion.attr("disabled", "disabled");

  navigator.geolocation.getCurrentPosition(function(position) {
    botonlocacion.removeAttr("disabled");
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('No se puede encontrar la locación')
  })
});
