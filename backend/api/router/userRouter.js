const express = require('express')
const router = express.Router()


//user/login
router.post('/login', (req, res) => {
    res.send("login end point...")
})


//user/signup
router.post('/signup', (req, res) => {
    res.send("signup end point...")
})


module.exports = router
