'use strict';

const socket = io(); //eslint-disable-line

socket.on('connection', (data) => {
  console.log('groot');
});

let usernameForm = document.getElementById('usernameForm');
let messageForm = document.getElementById('messageForm');

usernameForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
});
