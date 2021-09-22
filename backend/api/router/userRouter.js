const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()

//user/login
router.post('/login', UserController.login)

//user/signup
router.post('/signup', UserController.signup)

module.exports = router
