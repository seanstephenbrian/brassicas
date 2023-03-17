var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/inventory');
});

// GET incorrect password page:

router.get('/incorrect-password/:itemtype/:itemid', function(req, res, next) {
    res.render('incorrect_password', {
        item_type: req.params.itemtype,
        item_id: req.params.itemid
    });
});

module.exports = router;
