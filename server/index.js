const http = require('http');
const cors = require('cors');
const path = require('path');
const stockRouter = require('./routes/stocks');
const userRouter = require('./routes/user');
const express = require('express');
const app = express();
require('dotenv').config({
  path: '../.env',
});
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(stockRouter);
app.use(userRouter);

let staticPath = '../client/public';
let staticIndexPath = '../client/public/index.html';

if (process.env.NODE_ENV === 'production') {
  staticPath = '../client/build/static';
  staticIndexPath = '/../client/build/index.html';
}

app.use(express.static(path.join(__dirname, staticPath)));

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, staticIndexPath));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
