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
    from: 'santi@gmail.com',
    text: 'Hey, que pasa perra hpta',
    createdAt: 123
  });

  // Se ejecuta al recibir un mensaje desde el cliente
  socket.on('createMessage', (mensaje) => {
    console.log('createMessage', mensaje);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
