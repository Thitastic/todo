import Todos from '../../middleware/todos'
class Handle{
    static async getTodo(username){
        const todos = await Todos.getTodoByUser(username)
        if(todos.data.length > 0) return todos.data
        else return 0
    }
}
export default Handle