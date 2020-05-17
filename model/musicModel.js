const pool = require('./dbConnection');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('example', 'dev', 'secret', {
    dialect: 'mysql', host: '127.0.0.1',
    pool: {
    max: 10, // 커넥션 최대 개수
    min: 0, // 풀에 유지하는 커넥션 최소 개수
    acquire: 60000, // 커넥션 풀에서 커넥션 얻기 최대 대기 시간(기본 60초)
    idle: 10000, // 커넥션이 해제되기 전 idle 상태 대기 시간(msec, 기본 10초)
    evict: 1000 // 커넥션 풀에서 사용하지 않는 커넥션 해제 검사 간격(interval)
    }
});
class MusicModel {}
class Musics extends Sequelize.Model {}

Musics.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(300),
    artist: Sequelize.STRING(100),
    genre: Sequelize.STRING(100),
    url: Sequelize.STRING(300),
    createdAt: {
        allowNull: true,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
    }
}, {sequelize}); 

MusicModel.getMusicList = async () => {
    await Musics.findAll({})
    .then( results => {
        musicList = results;
    })
    .catch(err => {
        console.error('연결 실패 :', err);
    });
    return musicList;
}    

MusicModel.insertMusic = async (musicData) => {
    try {
        let music = await Musics.create({
            title: musicData.title,
            artist: musicData.artist,
            genre : musicData.genre,
            url: musicData.url
        }, {logging:false});
        const newData = music.dataValues;

        return newData;
    } catch (error) {
        console.error(error);
    }
}

MusicModel.getMusic = async (musicId) => {
    let music = null;
    await Musics.findAll({
        where:{id:musicId}
    })
    .then( results => {
        music = results[0];
    })
    .catch(err => {
        console.error('연결 실패 :', err);
    });
    
    return music;
}

MusicModel.updateMusic = async (musicData) => {
    let returnValue = await Musics.update(
        { 
            title: musicData.title,
            artist: musicData.artist,
            genre: musicData.genre,
            url: musicData.url
        },
        { where: { id: musicData.id } }
    );
    return returnValue;
}

MusicModel.deleteMusic = async (id) => {
    try {
        let result = await Musics.destroy({where: {id:id}});
    } catch (error) {
        console.error(error);  
    }
}

MusicModel.initModel = async () => {
    await sequelize.authenticate()
    .then(() => {
        console.log('Sequelize DB 연결 성공');
        Musics.sync().then( ret => {
            console.log('Sync Success :', ret);
        }).catch(error => {
            console.log('Sync Failure :', error);
        });
    })
    .catch(err => {
        console.error('Sequelize DB 연결 실패 :', err);
    });
}

module.exports = MusicModel;