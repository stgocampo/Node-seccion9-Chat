var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = $("#messages");
  var newMessage = messages.children('li');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = $.deparam(window.location.search)
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/'
    } else {
      console.log('Sin errores');
    }
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = $('<ol></ol>');
  users.forEach(function (user) {
    ol.append($('<li></li>').text(user))
  });

  $("#users").html(ol);
})

socket.on('newMessage', function (message) {
  var fechaFormateada = moment(message.createdAt).format('h:mm a')
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: fechaFormateada
  });
  $("#messages").append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  debugger;
  var fechaFormateada = moment(message.createdAt).format('h:mm a')
  var template = $("#locationMessage-template").html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: fechaFormateada
  });

  $("#messages").append(html);
  scrollToBottom();
});

$("#message-form").on("submit", function (e) {
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
