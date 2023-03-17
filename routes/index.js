var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/inventory');
});

router.get('/incorrect-password', function(req, res, next) {
    res.render('incorrect_password');
});

module.exports = router;
