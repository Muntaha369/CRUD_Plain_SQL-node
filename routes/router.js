const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth')

router.post('/signup',Auth.signup)
router.post('/login',Auth.login)

module.exports = router