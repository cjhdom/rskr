/**
 * Created by jihwchoi on 2017-03-27.
 */
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

console.log(path.resolve('') + ' vs ' + __dirname);


app.disable('x-powered-by');
app.set('views', path.join(path.resolve(''), 'dist/src/client'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', (req, res) => {
  res.render('layout');
});

const server = http.createServer(app);
server.listen(8888, () => {
  console.log('server listening on 8888');

});
