const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/movie/list');
});

const movie = require('./movie');
router.use('/movie', movie);

module.exports = router;