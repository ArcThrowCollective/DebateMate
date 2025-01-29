// run this in node to test socket communication

const { readFileSync } = require('fs');
const { io } = await import('socket.io-client');

const socket = io('wss://127.0.0.1:5000', {
  ca: readFileSync('../signal/cert/fullchain.pem'),
  query: { callerID: 'Nody' },
});

socket.on('connect_error', (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);
  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description);
  // some additional context, for example the XMLHttpRequest object
  console.log(err.context);
});

socket.emit('ping', 'pang');
