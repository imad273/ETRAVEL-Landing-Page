const express = require('express');
const router = express.Router();

const EditProfile = require('../Controllers/Users/EditProfile');
const GetProfile = require('../Controllers/Users/GetProfile');
const EditPass = require('../Controllers/Users/EditPass');
const UpdatePic = require('../Controllers/Users/EditPicture');

// Find Data of User
router.get('/getProfile?:id', GetProfile);

// Edit Profile
router.post('/EditProfile?:id', EditProfile);

// Edit Pictures
router.post('/EditPicture?:id', UpdatePic);

router.post('/editPassword?:id', EditPass);

module.exports = router