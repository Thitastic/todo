import User from '../middleware/users'
import Todo from '../middleware/todos'
class Handle{
    static async logout(token){
        return await User.logOut(token)
    }
    static async updateTodo(todo){
        return await Todo.updateTodo(todo)
    }
    static async removeTodo(id){
        return await Todo.deleteTodo(id)
    }

    static async updateStatus(todo){
        return await Todo.updateStatus(todo)
    }
}
export default Handle