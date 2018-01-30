class chatMessage{
  constructor(data){
    this.username = data.username;
    this.message = data.message;
    this.timestamp = data.timestamp;
  }

  render(parentElement){
    let container = document.createElement('div');
    let username = document.createElement('span');
    let message = document.createElement('p');
    let timestamp = document.createElement('span');

    username.textContent = this.username;
    message.textContent = this.message;
    timestamp.textContent = this.timestamp;

    container.appendChild(username);
    container.appendChild(message);
    container.appendChild(timestamp);

    parentElement.appendChild(container);
  }
}
