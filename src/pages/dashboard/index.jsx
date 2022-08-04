import { useEffect, useState } from 'react'
import Todo from '../../components/Todo'
import Handle from './handle'
import { connect } from 'react-redux'
import Empty from '../../components/Empty'
import Skeleton from '../../components/Skeleton'
const Dashboard = (props) => {

    const [todos, setTodos] = useState([])
    const [isLoad, setIsload] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsload(true)
            setTodos(await Handle.getTodo(props.user.username))
            setIsload(false)
        }
        fetchData()
    }, [props.user.username])

    const initView = () => {
        let list = []
        if (todos.length > 0) {
            list = todos.map((element) =>
                <Todo
                    todo={element} />

            )
        }
        else {
            list = <Empty link="/new" />
        }
        return list
    }





    return (
        <>
            {isLoad ? <Skeleton /> : initView()}
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