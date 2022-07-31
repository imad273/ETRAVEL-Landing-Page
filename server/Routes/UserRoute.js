const express = require('express');
const router = express.Router();

const Login = require('../Controllers/Auth/Login');
const Signup = require('../Controllers/Auth/Signup');
const GoogleSignup = require('../Controllers/Auth/GoogleSignup');
const GoogleLogin = require('../Controllers/Auth/GoogleLogin');

router.post('/Login', Login);
router.post('/LoginWithGoogle', GoogleLogin);

router.post('/SingUp', Signup);
router.post('/SingUpWithGoogle', GoogleSignup);

module.exports = router;