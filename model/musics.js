const fs = require('fs');


class Music {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.data = JSON.parse(data)
    }

    // Promise 예제
    getMusicList() {
        if (this.data) {
            return this.data;
        }
        else {
            return [];
        }
    }

    addMusic(title, artist, genre, url) {
        return new Promise((resolve, reject) => {
            let last = this.data[this.data.length - 1];
            let id = last.id + 1;

            if(!title || !artist || !genre || !url) {
                reject();
            } else {
                let newMusic = {id:id, title:title, artist:artist, genre:genre, url:url};
                this.data.push(newMusic);
                
                resolve(newMusic);
            }
        });
    }

    getMusicDetail(musicId) {
        return new Promise((resolve, reject) => {
            for (var music of this.data ) {
                if ( music.id == musicId ) {
                    resolve(music);
                    return;
                }
            }
            reject({msg:'Can not find music', code:404});
        });
    }

    getMusicDetailForUpdate(musicId) {
        return new Promise((resolve, reject) => {
            for (var music of this.data ) {
                if ( music.id == musicId ) {
                    resolve(music);
                    return;
                }
            }
            reject({msg:'Can not find music', code:404});
        });
    }

    updateMusic(musicId, title, artist, genre, url) {
        return new Promise((resolve, reject) => {
            
            for (var music of this.data ) {
                if ( music.id == musicId ) {
                    if(!title || !artist || !genre || !url) {
                        reject();                        
                    } else {
                        let id = Number(music.id);
                        let newMusic = {id, title, artist, genre, url};
                        this.data.splice(musicId, 1, newMusic);
                        resolve(newMusic);
                        return;
                    }
                }
            }
            reject({msg:'Can not find music', code:404});
        });
    }

    deleteMusic(musicId) {
        return new Promise((resolve, reject) => {
            for (var music of this.data ) {
                if ( music.id == musicId ) {
                    this.data.splice(musicId, 1);
                    resolve(music);
                    return;
                }
            }
            reject({msg:'Can not find music', code:404});
        });
    }

}

module.exports = new Music();