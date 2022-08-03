import Form from '../../components/Form'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Edit = (props) =>{

    const history = useNavigate()
    useEffect(()=>{
        document.title = "TODO | Edit"
        checkTempTodo()
    })

    const checkTempTodo = () =>{
        if(!props.tempTodo){
            history("/dashboard")
        }
    }

    return(
        <div className="new">
            <Form auth={props.user} todo={props.tempTodo}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTemp: (todo) => dispatch({ type: "SET_TEMP", payload: todo })
    }
}

const mapStateToProps = (state) => {
    return {
        tempTodo : state.tempTodo,
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Edit)