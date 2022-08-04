import Form from '../../components/Form'
import {connect} from 'react-redux'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
const New = (props) =>{
    const {t} = useTranslation()
    return(
        <div className="new">
            <Helmet>
                <title>TODO | {t("documentTitle.new")}</title>
            </Helmet>
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