var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/users', require('./users'));

router.use('/questions', require('./questions'));

router.use('/answers', require('./answers'));


module.exports = router;
