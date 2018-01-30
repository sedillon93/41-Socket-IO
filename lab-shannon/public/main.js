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
  let usernameSpace;
  socket.emit('set-username', {username: username});
  usernameInput.value = '';

  if(!document.getElementById('usernameSpace')){
    usernameSpace = document.createElement('section');
    usernameSpace.setAttribute('id', 'usernameSpace');
    usernameSpace.textContent = `Your username is: ${username}`;
    messageBoard.prepend(usernameSpace);
  }
  usernameSpace = document.getElementById('usernameSpace');
  usernameSpace.textContent = `Your username is: ${username}`;
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let message = messageInput.value;
  socket.emit('send-message', {message: message});
  messageInput.value = '';
});

socket.on('incoming-message', (data) => {
  let newMessage = new chatMessage(data);  //eslint-disable-line
  newMessage.render(messageBoard);
});
