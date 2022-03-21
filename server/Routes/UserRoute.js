const express = require('express');
const router = express.Router();

const LoginController = require('../Controllers/Login');
const SignupController = require('../Controllers/Signup');

router.post('/Login', LoginController)

router.post('/SingUp', SignupController)

module.exports = router;