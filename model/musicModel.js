const pool = require('./dbConnection');

class MusicModel {}

MusicModel.getMusicList = async () => {
    const sql = 'SELECT * FROM musics';

    let conn;
    try {
        conn = await pool.getConnection();
        const [rows, metadata] = await conn.query(sql);
        conn.release();
        console.log("TESTLOG");
        console.log(rows);
        
        return rows;
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}    

MusicModel.insertMusic = async (title, artist, genre, url) => {
    const sql = 'INSERT INTO musics SET ?';
    const data= {title, artist, genre, url};

    let conn;
    try {
        conn = await pool.getConnection();
        const ret = await conn.query(sql, data);
        console.log(ret);
        const musicId = ret[0]['insertId'];
        return musicId;
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}

MusicModel.getMusic = async (musicId) => {
    const sql = 'SELECT * FROM musics WHERE id = ?';
    let conn;
    try {        
        conn = await pool.getConnection();
        const [rows, metadata] = await conn.query(sql, musicId);
        conn.release();
        return rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}

MusicModel.updateMusic = async (id, title, artist, genre, url) => {
    const sql = 'UPDATE musics SET ? WHERE id = ?';
    const data = {id, title, artist, genre, url};
    const condition = id;

    let conn;
    try {
        conn = await pool.getConnection();
        const ret = await conn.query(sql, [data, condition] );
        const info = ret[0];
        return data;
    } catch (error) {
        console.error(error);  
    } finally {
        if ( conn ) conn.release();
    }
}

MusicModel.deleteMusic = async (id) => {
    const sql = 'DELETE FROM musics WHERE id = ?';
    let conn;
    try {
        conn = await pool.getConnection();        
        const ret = await conn.query(sql, parseInt(id));
        return ret[0]['affectedRows'];
    } catch (error) {
        console.error(error);  
    } finally {
        if ( conn ) conn.release();
    }
}

MusicModel.initModel = async () => {
    const sql = 'drop table if exists musics; create table musics ( id int primary key auto_increment, title varchar(300), artist varchar(100), genre varchar(100), url varchar(300));insert into musics values("1", "X song", "볼빨간 사춘기", "K-pop", "https://www.youtube.com/watch?v=ZD9jqLNN_V4");';
    await pool.query(sql);
}

module.exports = MusicModel;