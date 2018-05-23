const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ModelUser = require('../models/m_users');
const sendemail = require('../helpers/nodemailer.js');

const secret_key = Number(process.env.SECRETKEY);
const private_key = process.env.PRIVATEKEY;

module.exports = {
    
  signup: (req, res, next) => {

    const { email, password, username } = req.body;
    // console.log(req.body)

    let hash = bcrypt.hashSync(password, secret_key);
    // console.log(hash)

    let newObj = {
      email,
      password: hash,
      username
    }
    // console.log('=====',newObj)

    ModelUser.create(newObj)
      .then(result => {

        let userJwt = {
          _id: result._id,
          email: result.email,
          username: result.username
        }
        // console.log(userJwt)

        let token = jwt.sign(userJwt, private_key);    

        sendemail(result.email)

        res.status(201).json({
          message: 'User sign up successful',
          result,
          token
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: User sign up',
          err
        })
      })

  },

  signin: (req, res, next) => {

    const { email, password } = req.body;

    ModelUser.findOne({ email: email }, (err,result) => {
      if (!result) {

        res.status(404).json({
          message: 'ERROR: user not found'
        })

      } else {

        let checkHash = bcrypt.compareSync(password, result.password);
        
        if (checkHash == true) {

          let userJwt = {
            _id: result._id,
            email: result.email,
            username: result.username
          }
          // console.log(userJwt)

          let token = jwt.sign(userJwt, private_key);    

          res.status(200).json({
            message: 'User sign in successful',
            user: result,
            token
          })

        } else {

          res.status(403).json({
            message: 'ERROR: incorrect email or password'
          })

        }

      }
    })

},

}