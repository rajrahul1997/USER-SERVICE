var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { authenticateToken, isLoggedIn } = require('../utils/authUtils');
const User = require('../models/user').User;

router.get('/', isLoggedIn, async function(req, res) {
    try {
      let isLoggedin = req.isLoggedIn;
      const sort = req.query.sort;                //Sort data by firstName,lastName,employeeId,organsization
      const skip = parseInt(req.query.skip);      // Starting Row
      const limit = parseInt(req.query.limit);   // Ending Row 
      //Search using FirstName, LastName and employeeID using param object
      let params = {
        ...(req.query.employeeId && {_id: req.query.employeeId}),
        ...(req.query.firstName && {firstName:req.query.firstName}),
        ...(req.query.lastName && {lastName: req.query.lastName}),
      }
      if(!isLoggedin){
        throw ("Please login first");
      }else{
        var user = await User.find(params)
        .skip(skip)
        .limit(limit)
        .sort(sort);
        if (!user) throw 'Could not find';
      }
      let users = [];
      for (let eachuser of user){
        const userinfo ={
          "firstName" : eachuser.firstName,
          "lastName"  :eachuser.lastName,
          "emailId": eachuser.emailId,
          "employeeId"  : eachuser._id,
          "organsization": eachuser.organsization,
        };
        users.push(userinfo);
      };
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(500).json({error: 'Server Error!'});
    }
});

module.exports = router;