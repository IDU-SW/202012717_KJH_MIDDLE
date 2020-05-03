const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");

const app = express();

// PUT, DELETE
app.use(methodOverride('_method'));

// 템플릿 엔진 설정(필수)
app.set('view engine', 'ejs');

// 템플릿 파일 위치 설정(필수)
app.set('views', __dirname + '/views');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const musicRouter = require('./router/music_router');
app.use(musicRouter);

module.exports = app;

