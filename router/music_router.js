const express = require('express');
const router = express.Router();
// const musics = require('../model/musics');
const musics = require('../model/musicModel');

router.get('/initModel', initModel);
router.get('/musics', showMusicList);
router.get('/musics/:musicId', showMusicDetail);
router.post('/musics', addMusic);
router.put('/musics/:musicId', updateMusic);
router.delete('/musics/:musicId', deleteMusic);
router.get('/addMusics', addMuisicForm);
router.get('/musics/update/:musicId', updateMusicForm);

module.exports = router;

async function initModel(req, res) {
    try {
        await musics.initModel();
        // 테이블 생성 및 테스트 데이터 입력
        
        res.statusCode = 302;
        res.setHeader('Location', '/musics');
        res.end();
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function showMusicList(req, res) {
    const musicList = await musics.getMusicList();
    console.log("musicList : ");
    console.log(musicList);
    // 템플릿 엔진에 데이터 전달
    res.render('list', {musics:musicList});
}


// Async-await를 이용하기
async function showMusicDetail(req, res) {
    try {
        // 음악 상세 정보 Id
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await musics.getMusic(musicId);
        console.log(info);
        // 템플릿 엔진에 데이터 전달
        res.render('read', {music:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}


// 새 음악 추가
// POST 요청 분석 -> 바디 파서
async function addMusic(req, res) {
    const title = req.body.title;
    const artist = req.body.artist;
    const genre = req.body.genre;
    const url = req.body.url;

    validation(res, title, artist, genre, url);

    try {
        const musicData = {
            title: title,
            artist: artist,
            genre : genre,
            url: url
        };
        const result = await musics.insertMusic(musicData);
        
        res.statusCode = 302;
        res.setHeader('Location', '/musics');
        res.end();
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 음악 수정
async function updateMusic(req, res) {
    const title = req.body.title;
    const artist = req.body.artist;
    const genre = req.body.genre;
    const url = req.body.url;

    validation(res, title, artist, genre, url);

    try {
        // 음악 상세 정보 Id
        const musicId = req.params.musicId;
        
        const musicData = {
            id: musicId,
            title: title,
            artist: artist,
            genre : genre,
            url: url
        };
        const result = await musics.updateMusic(musicData);
        
        res.statusCode = 302;
        res.setHeader('Location', '/musics');
        res.end();
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 음악 제거
async function deleteMusic(req, res) {
    try {
        // 음악 상세 정보 Id
        const musicId = req.params.musicId;
        console.log('delete musicId : ', musicId);
        const info = await musics.deleteMusic(musicId);
        
        res.statusCode = 302;
        res.setHeader('Location', '/musics');
        res.end();
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

function addMuisicForm(req, res) {
    // 템플릿 엔진에 데이터 전달
    res.render('new-form');
}

async function updateMusicForm(req, res) {
    try {
        // 음악 상세 정보 Id
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await musics.getMusic(musicId);

        // 템플릿 엔진에 데이터 전달
        res.render('update-form', {music:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

function validation(res, title, artist, genre, url) {
    if (!title) {
        res.status(400).send({error:'title 누락'});
        return;
    }
    if (!artist) {
        res.status(400).send({error:'artist 누락'});
        return;
    }
    if (!genre) {
        res.status(400).send({error:'genre 누락'});
        return;
    }
    if (!url) {
        res.status(400).send({error:'url 누락'});
        return;
    }
}