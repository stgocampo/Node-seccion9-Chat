var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'santi@ejemplo.com',
    text: 'hola, es santiago'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(email) {
  console.log('Nuevo mensaje',email);
});
