const express = require('express');
const router = express.Router();
const getConnection = require('../libs/mysql_pool.js');

// 리스트 화면
router.get('/list', function(req, res) {
    getConnection((conn) => {
        let query = conn.query('select * from movie', function(err, rows) {
            if (err) {
                throw err; 
            } else {
                res.render('movie_list.ejs', {movies : rows});
            }
        });

        conn.release();
    });
});

// 상세 화면
router.get('/:id/view', function(req, res) {
    let id = req.params.id;

    getConnection((conn) => {
        let query = conn.query('select * from movie where id = ?', [id], function(err, rows) {
            if (err) {
                throw err; 
            } else {
                res.render('movie.ejs', {movie : rows[0]});
            }
        });

        conn.release();
    });    
});

// 추가 화면
router.get('/regist', function(req, res) {
    res.render('movie_regist.ejs', {msg : ''});
});

// 추가
router.post('/regist', function(req, res) {
    let title = req.body.title;
    let type = req.body.type;
    let grade = req.body.grade;

    getConnection((conn) => {
        let query = conn.query('select * from movie where title = ?', [title], function(err, rows) {
            if (err) {
                throw err; 
            }
    
            if (rows.length) {
                res.render('movie_regist.ejs', {msg : '이미 등록된 제목입니다.'});
            } else {
                let query = conn.query('insert into movie (title, type, grade) values (?, ?, ?)', [title, type, grade], function(err, rows) {
                    if (err) {
                        throw err; 
                    } else {
                        res.redirect('/movie/list');
                    }
                });
            }
        });

        conn.release();
    });
});

// 수정 화면
router.get('/:id/modify', function(req, res) {
    let id = req.params.id;

    getConnection((conn) => {
        let query = conn.query('select * from movie where id = ?', [id], function(err, rows) {
            if (err) {
                throw err; 
            } else {
                res.render('movie_modify.ejs', {movie : rows[0], msg : ''});
            }
        });

        conn.release();
    });    
});

// 수정
router.post('/:id/modify', function(req, res) {
    let id = req.params.id;

    let title = req.body.title;
    let type = req.body.type;
    let grade = req.body.grade;

    let movie = {
        title : title,
        type : type,
        grade : grade
    };
    
    getConnection((conn) => {
        let query = conn.query('select * from movie where title = ?', [title], function(err, rows) {
            if (err) {
                throw err; 
            }
    
            if (rows.length) {
                res.render('movie_modify.ejs', {movie : movie, msg : '이미 등록된 제목입니다.'});
            } else {
                let query = conn.query('update movie set title=?, type=?, grade=? where id=?', [title, type, grade, id], function(err, rows) {
                    if (err) {
                        throw err; 
                    } else {
                        res.redirect('/movie/list');
                    }
                });
            }
        });

        conn.release();
    });
});

// 삭제
router.post('/:id/remove', function(req, res) {
    let id = req.params.id;

    getConnection((conn) => {
        let query = conn.query('delete from movie where id=?', [id], function(err, rows) {
            if (err) {
                throw err; 
            } else {
                res.redirect('/movie/list');
            }
        });

        conn.release();
    });
});

module.exports = router;