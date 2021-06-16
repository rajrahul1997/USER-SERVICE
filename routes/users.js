var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user').User;
const { validateEmail } = require('../utils/utils');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.post('/', async function(req, res) {
    try{
      let { firstName,lastName, emailId, organsization,password } = req.body;
      if(!firstName || !lastName || !organsization ||!emailId || !password) return res.status(400).json({error: 'Invalid params!'});
      if(!validateEmail(emailId)) return res.status(403).json({error: 'Invalid EmailId!'});
      if(password.length < 6) return res.status(403).json({error: 'Password length is less than 6 chars!'});
      let user = await User.findOne({emailId});
      if(user) return res.status(403).json({error: 'User with this emailId already exists!'});
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          let user  = await User.create({emailId, firstName,lastName, password: hash, organsization});
          res.status(200).json(user);
        });
      });
      return;
    } catch(e) {
      console.log(e);
      return res.status(500).json({error: 'Server error !'})
    } 
});

module.exports = router;
 
