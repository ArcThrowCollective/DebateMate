// run this in node to test socket communication

// import dotenv from 'dotenv';
// dotenv.config({ path: '.env' });
const { readFileSync } = require('fs');
const { io } = await import('socket.io-client');

// rejectUnauthorized: false,
const serverURI = `https://${process.env.SIGNAL_HOST}:${process.env.SIGNAL_PORT}`;
const socket = io(serverURI, {
  ca: readFileSync('./cert/signalcert.pem'),
  auth: {
    user: 'Nody',
    id: 666,
  },
});
socket.emit('joinRoom', 'lobby');

console.log(`..connecting to signaling server ${serverURI}`);

socket.on('connect_error', (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);
  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description);
  // some additional context, for example the XMLHttpRequest object
  console.log(err.context);
});

socket.on('pong', () => console.log('pong'));
socket.emit('ping');
socket.emit('joinRoom', 'lobby');
