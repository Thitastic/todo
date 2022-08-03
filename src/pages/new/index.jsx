import Form from '../../components/Form'
import {connect} from 'react-redux'
import { useEffect } from 'react'
const New = (props) =>{
    useEffect(()=>{
        document.title = "TODO | New"
    })
    return(
        <div className="new">
            <Form todo={null} auth={props.user} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps) (New)