const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()

//user/login
router.post('/login', UserController.login)

//user/signup
router.post('/signup', UserController.signup)

//user/isloggedin
router.get('/isloggedin', UserController.isLoggedIn)

//user/logout
router.get('/logout', UserController.logout)


module.exports = router
