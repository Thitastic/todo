const express = require('express')
const mongodb = require('mongodb')
const route = express.Router()

const url = `mongodb+srv://thitastic:ten96nctu@cluster0.bzhzi.mongodb.net`



route.get("/user/:username", async (req, res)=>{
    res.send(await getTodoByUsername(req.params.username))
})


route.post("/", async (req, res)=>{
    res.send(await create(req.body.todo))
})

route.delete("/:id", async (req, res)=>{
    res.send(await deleteTodo(req.params.id))
})

route.put("/", async (req, res) =>{
    res.send(await update(req.body.todo))
})

route.put("/status", async (req, res) =>{
    res.send(await updateStatus(req.body.todo))
})




const getTodoByUsername = async (username) =>{
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
        const todos = client.db('todo').collection('todo-items')
        return await todos.find({_auth : username, _visibility: true}).toArray()
    } catch (error) {
        console.error(error)
    }
}


const create = async (todo) =>{
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
        const todos = client.db('todo').collection('todo-items')
        return todos.insertOne(
            {
                _content : todo.content,
                _title: todo.title,
                _auth: todo.auth,
                _date_start: todo.dateStart,
                _date_end: todo.dateEnd,
                _priority: todo.priority,
                _status: todo.status
            }
        )
        
    }
    catch(error){
        console.log(error)
    }
}


const deleteTodo = async (id) =>{
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
        const todos = client.db('todo').collection('todo-items')
        return todos.updateOne(
            {_id: new mongodb.ObjectId(id)},
            {
                $set:
                {_visibility: false}
            },
            {upsert: false}
        )
    } catch (error) {
        console.error(error)
    }
}

const update = async (todo) =>{
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
        const todos = client.db('todo').collection('todo-items')
        if(todo.id == "") todo.id = mongoObjectId()
        console.log(">>>ID>>>", todo.id)
        return todos.updateOne(
            {_id : mongodb.ObjectId(todo.id)},
            {
                $set:
                {
                    _content : todo.content,
                    _title: todo.title,
                    _date_start: todo.startDate,
                    _date_end: todo.endDate,
                    _priority: todo.priority,
                    _status: todo.status,
                    _auth: todo.auth,
                    _visibility: todo.visibility
                }
            },
            { upsert: true }
        )
        
    }
    catch(error){
        console.log(error)
    }
}

const updateStatus = async (todo) =>{
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
        const todos = client.db('todo').collection('todo-items')
        return todos.updateOne(
            {_id: mongodb.ObjectId(todo.id)},
            {
                $set:
                {_status: todo.status}
            },
            {upsert: false}
        )
    } catch (error) {
        console.error(error)
    }
}

const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}

module.exports = route