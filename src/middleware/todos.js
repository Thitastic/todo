import axios from 'axios'

class Todos{
    static async getTodoByUser(username){
        try {
            const response = await axios.get("http://localhost:1009/api/todo/user/" + username)
            return response
        } catch (error) {
            console.error(error)
        }
    }
    static async addTodo(todo){
        try {
            const response = await axios.post("http://localhost:1009/api/todo", {todo: todo})
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    static async deleteTodo(id){
        console.log(">>>DELETE ID >>>", id)
        try {
            const response = await axios.delete("http://localhost:1009/api/todo/" + id)
            return response
        } catch (error) {
            console.error(error)
        }
    }

    static async updateTodo(todo){
        try {
            const response = await axios.put("http://localhost:1009/api/todo", {todo: todo})
            return response
        } catch (error) {
            console.error(error)
        }
    }

    static async updateStatus(todo){
        try {
            const response = await axios.put("http://localhost:1009/api/todo/status", {todo: todo})
            return response
        } catch (error) {
            console.error(error)
        }
    }
}
export default Todos