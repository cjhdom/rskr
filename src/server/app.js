/**
 * Created by jihwchoi on 2017-03-27.
 */
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.disable('x-powered-by');
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../client')));

app.use('/', (req, res) => {
  res.send('hi');
});

const server = http.createServer(app);
server.listen(4561);
