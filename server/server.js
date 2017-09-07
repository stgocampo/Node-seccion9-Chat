const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit => Envia un mensaje al cliente desde el servidor
  socket.emit('newMessage', generateMessage('Admin', 'Bienvenido al chat!'));

  // socket.on => Se ejecuta al recibir un mensaje desde el cliente
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Un nuevo usuario ha ingresado'));

  socket.on('createMessage', (mensaje, callback) => {
    io.emit('newMessage', generateMessage(mensaje.from, mensaje.text));
    callback("Esto es desde el servidor");
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
