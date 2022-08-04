import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Todo from '../../components/Todo'
import Handle from './handle'
import { connect } from 'react-redux'
import Empty from '../../components/Empty'
import Skeleton from '../../components/Skeleton'
import { useTranslation } from 'react-i18next'
const Dashboard = (props) => {
    const {t} = useTranslation()
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
            <Helmet>
                <title>TODO | {t("documentTitle.dashboard")}</title>
            </Helmet>
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