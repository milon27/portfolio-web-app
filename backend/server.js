const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()


const app = express()

//middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//router
//http://localhost:2727/
app.get('/', (req, res) => {
    res.send("app running....")
})

//user
app.use('/user', require('./api/router/userRouter'))

// global error
app.use((req, res) => {
    res.status(404).send("404 not found!")
})

app.listen(2727, () => {
    console.log("server is running on port 2727");
})