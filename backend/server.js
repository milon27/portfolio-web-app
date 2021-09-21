const express = require('express')

const app = express()

//router
//http://localhost:2727/
app.get('/', (req, res) => {
    res.send("app running....")
})

//user
app.use('/user', require('./api/router/userRouter'))



app.listen(2727, () => {
    console.log("server is running on port 2727");
})