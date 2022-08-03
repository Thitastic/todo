const express = require('express')
const mongodb = require('mongodb')
const route = express.Router()

const url = `mongodb+srv://thitastic:ten96nctu@cluster0.bzhzi.mongodb.net`

//get all user
route.get("/",async (req, res)=>{
    res.send(await getAll())
})

/**
 * Verify username and password
 * If success: @return a token
 * If fail: @return 0
 */
route.post("/login/s", async (req, res) =>{
    res.send(await verify(req.body.user))
} )

/**
 *  Verify token
 * @return 
 * If success: @return a token
 * If fail : @return 0
 */
 route.post("/login/t", async (req, res) =>{
    res.send(await verifyToken(req.body.token))
} )

/**
 * Log out
 */
route.post("/logout", async (req, res)=>{
    res.send(await logout(req.body.token))
})

/**
 * Create
 */

 route.post("/new", async (req, res)=>{
    res.send(await create(req.body.user))
})

/**
 * fund username
 */
route.get('/username/:username' ,async (req,res)=>{
    res.send(await findUsername(req.params.username))
})

/**
 * fund email
 */
 route.get('/email/:email' ,async (req,res)=>{
    res.send(await findEmail(req.params.email))
})


/**
 * Functions
 */
//get all users
const getAll = async () =>{
    try {
        const client = await new mongodb.MongoClient
        (
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const users = client.db('todo').collection('user')
        return users.find({}).toArray()
    } catch (error) {
        console.error(error)
    }
}

//login
const verify = async (body) =>{
    try {
        const client = await new mongodb.MongoClient
        (
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const users = client.db('todo').collection('user')
        const auth = await users.find({_email : body.email, _password: body.password}).toArray()
        console.log(auth.length)
        if(auth.length < 1){
            return 0
        }
        else{
            const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
            users.updateOne(
                {_email: body.email},
                {
                    $set:
                    {
                        _token: token
                    }
                }
            )         
            console.log(">>>password: ", body.password == auth._password)
            return await users.find({_email: body.email}).toArray()
        }
    } catch (error) {
        console.error(error)
    }
}

//Verify token
const verifyToken = async (token) =>{
    try {
        const client = await new mongodb.MongoClient
        (
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const users = client.db('todo').collection('user')
        const auth = await users.find({_token: token}).toArray()
        console.log(">>>>> LENGTH ", auth.length)
        if(auth.length < 1){
            console.log(">>>FALSE")
            return 0
        }
        else{
            console.log(">>>TRUE")
            const newToken = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
            users.updateOne(
                {_token: token},
                {
                    $set:
                    {
                        _token: newToken
                    }
                }
            )
            return newToken
        }
    } catch (error) {
        console.error(error)
    }
}

//Log out
const logout = async (token) =>{
    console.log(token)
    try {
        const client = await new mongodb.MongoClient
        (
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const users = client.db('todo').collection('user')
            users.updateOne(
                {_token: token},
                {
                    $set:
                    {
                        _token: "-"
                    }
                }
            )
            return 200
    } catch (error) {
        console.error(error)
    }
}

const create = async (user) =>{
    try{
        const client = await new mongodb.MongoClient
        (
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const users = client.db('todo').collection('user')
        const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
        users.insertOne(
            {
                _username: user.username,
                _password: user.password,
                _email: user.email,
                _token: token
            }
        )
        const newUser = await users.find({_username: user.username}).toArray()
        console.log(">>> ", newUser)
        return newUser
    }
    catch(error){
        console.log(error)
    }
}

//Find user by username
const findUsername = async (_username) =>{
    try {
        const client = await new mongodb.MongoClient
        (
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const users = client.db('todo').collection('user')
        return users.find({_username: _username}).toArray()
    } catch (error) {
        console.error(error)
    }
}

//Find user by email
const findEmail = async (email) =>{
    console.log(email)
    try {
        const client = await new mongodb.MongoClient
        (
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const users = client.db('todo').collection('user')
        return users.find({_email: email}).toArray()
    } catch (error) {
        console.error(error)
    }
}

module.exports =  route