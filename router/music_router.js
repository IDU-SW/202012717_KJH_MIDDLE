const express = require('express');
const router = express.Router();
const musics = require('../model/musics');

router.get('/musics', showMusicList);
router.get('/musics/:musicId', showMusicDetail);
router.post('/musics', addMusic);
router.put('/musics/:musicId', updateMusic);
router.delete('/musics/:musicId', deleteMusic);

module.exports = router;

function showMusicList(req, res) {
    const musicList = musics.getMusicList();
    const result = { data:musicList, count:musicList.length };
    res.send(result);
}


// Async-await를 이용하기
async function showMusicDetail(req, res) {
    try {
        // 음악 상세 정보 Id
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await musics.getMusicDetail(musicId);
        res.send(info);
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
        const result = await musics.addMusic(title, artist, genre, url);
        res.send({msg:'success', data:result});
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
        
        const result = await musics.updateMusic(musicId, title, artist, genre, url);
        res.send({msg:'success', data:result});
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
        res.send(info);
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
