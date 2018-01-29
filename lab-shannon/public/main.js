'use strict';

const socket = io();

socket.on('connection', (data) => {
  console.log('groot');
});
