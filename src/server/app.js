/**
 * Created by jihwchoi on 2017-03-27.
 */
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.disable('x-powered-by');
// app.set('views', __dirname);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => {
  res.render('index');
});

const server = http.createServer(app);
server.listen(8888, () => {
  console.log('server listening on 8888');
});
