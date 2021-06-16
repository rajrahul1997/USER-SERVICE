var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user').User;
const { validateEmail } = require('../utils/utils');
const { getToken } = require('../utils/authUtils');


router.post('/', async function(req, res) {
  try { 
    let { emailId, password } = req.body;
    if (!emailId || !password) return res.status(400).json({error: 'Invalid Params!'});
    if (!validateEmail(emailId)) return res.status(403).json({error: 'Invalid Email!'});
    let user = await User.findOne({emailId});
    if (!user) return res.status(403).json({error: 'User not registered'});
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        let tokenPayload = {
          emailId: user.emailId,
          firstName: user.firstName,
          lastName:user.lastName,
          organsization: user.organsization,
          employeeID: user._id
        };
        tokenPayload.token = getToken(tokenPayload);
        res.status(200).json(tokenPayload);
      } else {
        res.status(403).json({error: 'Incorrect Password'});
      }
    });
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }
});

module.exports = router;