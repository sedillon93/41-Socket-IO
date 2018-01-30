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
    let time = new Date();
    let minute = time.getMinutes();
    let hour = Math.abs(time.getHours() - 12);
    let interval;
    if(time.getHours() - 12 < 0){
      interval = 'am';
    }else{
      interval = 'pm';
    }
    let day = time.getDate();
    let month = time.getMonth() + 1;
    data.timestamp = `${hour}:${minute} ${interval} ${month}/${day}`;
    io.emit('incoming-message', data);
  });

  socket.on('set-username', (data) => {
    client[socket.id].username = data.username;
  });
});


http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
