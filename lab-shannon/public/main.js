'use strict';

const socket = io(); //eslint-disable-line

let usernameForm = document.getElementById('usernameForm');
let usernameInput = document.getElementById('username');
let messageForm = document.getElementById('messageForm');
let messageInput = document.getElementById('message');
let messageBoard = document.getElementById('messageBoard');

usernameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let username = usernameInput.value;
  socket.emit('set-username', {username: username});
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let message = messageInput.value;
  socket.emit('send-message', {message: message});
});

socket.on('incoming-message', (data) => {
  let newMessage = new chatMessage(data);  //eslint-disable-line
  newMessage.render(messageBoard);
});
