import Form from '../../components/Form'
import { Helmet } from 'react-helmet'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Edit = (props) =>{
    const {t} = useTranslation()

    const history = useNavigate()
    useEffect(()=>{
        checkTempTodo()
    },[])

    const checkTempTodo = () =>{
        if(!props.tempTodo){
            history("/dashboard")
        }
    }

    return(
        <div className="new">
            <Helmet>
                <title>TODO | {t("documentTitle.edit")}</title>
            </Helmet>
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