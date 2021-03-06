'use strict';
const express = require('express'),
      path    = require('path'),
      app     = express(),
      router  = express.Router();

const rootPath = '/webroot';

// テンプレートエンジン
app.set('views', path.join(__dirname + rootPath) );
app.set('view engine', 'pug');

// 静的ファイル
app.use(express.static(__dirname + rootPath, { index: false }));

// Routing
app.get('/', (req, res)=> {
  res.render('index');
});

app.get('/:dir', (req, res)=> {
  console.log(req.params.dir);
  res.render(req.params.dir + '/index', {title: req.params.dir});
});

// Error
app.use((err, req, res, next)=> {
  console.log('>> ERROR >>', err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, ()=> {
  console.log('Express Server');
});
