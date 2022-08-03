import Todo from '../../middleware/todos'

class Handle {
    static async updateTodo(todo){
        const status = await Todo.updateTodo(todo)
        return status
    }
}
export default Handle