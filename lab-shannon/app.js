'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('./public'));
let client = {};

io.on('connection', (socket) => {
  console.log(`${socket.id} joined`);
  client[socket.id] = {};
  client[socket.id].username = '';

  socket.on('disconnect', () => {
    console.log(`${socket.id} left`);
  });

  socket.on('send-message', (data) => {
    data.username = client[socket.id].username;
    data.timestamp = new Date();
    io.emit('incoming-message', data);
  });

  socket.on('set-username', (data) => {
    client[socket.id].username = data.username;
  });
});


http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
