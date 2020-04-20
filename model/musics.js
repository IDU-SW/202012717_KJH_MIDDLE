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

    addMusic(title, director, year, synopsis) {
        return new Promise((resolve, reject) => {
            let last = this.data[this.data.length - 1];
            let id = last.id + 1;

            let newMusic = {id:id, title:title, director:director, year:year, synopsis:synopsis};
            this.data.push(newMusic);

            resolve(newMusic);
        });
    }

    // Promise - Reject
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
}

module.exports = new Music();