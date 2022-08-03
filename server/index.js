const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//api

const App = express()
App.use(bodyParser.json())
App.use(cors())

//Get api
const user = require('./models/user')
App.use("/api/user", user)


const todos = require('./models/todo')
App.use("/api/todo", todos)



App.listen(1009, ()=>{
    console.log("App published at localhost:1009!")
})