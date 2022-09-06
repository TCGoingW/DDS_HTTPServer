const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const api = require('./routes');

const app = express();
const http = require('http');
const server = http.createServer(app);

// socket io
const socketServer = require('socket.io').Server;
const io = new socketServer(server);

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use('/api', api);

app.use(express.static('statics'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ===== socket io =====
io.on('connection', socket => {
  console.log('ahh!');
});

setInterval(() => {
  let rand = Math.floor(Math.random() * 1000)-500;
  io.emit('price', rand);
}, 1000);


server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});