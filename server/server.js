const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit => Envia un mensaje al cliente desde el servidor
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Bienvenido al chat'
  });

  // socket.on => Se ejecuta al recibir un mensaje desde el cliente
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'Un nuevo usuario ha ingresado',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (mensaje) => {
    console.log('createMessage', mensaje);
    io.emit('newMessage', {
      from: mensaje.from,
      text: mensaje.text,
      createdAt: new Date().getTime()
    })
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
