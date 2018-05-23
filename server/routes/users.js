const express = require('express');
const { signup, signin } = require('../controllers/c_users');

const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router
  .post('/signup', signup)
  .post('/signin', signin)


module.exports = router;
