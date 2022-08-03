import { useEffect, useState } from 'react'
import Todo from '../../components/Todo'
import { useNavigate } from 'react-router-dom'
import Handle from './handle'
import { connect } from 'react-redux'
const Dashboard = (props) => {

    const [todos, setTodos] = useState([])
    const [todoEl, setTodoEl] = useState([])

    useEffect(() => {
        const initView = async () => {
            setTodos(await Handle.getTodo(props.user.username))
            if(todos.length > 0) return
            let list = []
            if(todos){
                list = todos.map((element) => 
                <Todo
                    todo={element} />
                
            )
            }
            else{
                list = "(No Todo found)"
            }
            setTodoEl(list)
        }
        initView()
    },[props.user.username,todos])





    return (
        <>
        {todoEl}
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch({ type: "USER_LOGIN", payload: user })
    }
}

const mapStateToProps = (state) => {
    return {
        userAuth: state.Auth,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)