import { useTranslation } from 'react-i18next'
import { Button, Tooltip, Avatar, Dropdown, Spinner} from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import {connect} from 'react-redux'
import Handle from './Handle'
import { useState } from 'react'
const Controls = (props) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [isLogout, setIsLogout] = useState(false)

    const logout = async () =>{
        setIsLogout(true)
        const result = await Handle.logout(localStorage.getItem("token"))
        console.log(result)
        if(result===200){
            localStorage.removeItem("token")
            props.auth(false)
        }
        setIsLogout(false)
    }

    if(props.userAuth){
        return (
            <div className="flex flex-row gap-3">
                <Dropdown
                    inline={true}
                    size="sm"
                    label={
                        <div className="avatar flex gap-2 items-center">
                            <Avatar
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                                bordered={true}
                                status="online" statusPosition="bottom-right"
                            />
                            <div className="text-md font-normal">{props.user? props.user.username : "username"}</div>
                        </div>
                    }
                >
                    <Dropdown.Item onClick={()=>logout()}>
                        {isLogout && <Spinner size="sm" aria-label="Default status example" /> }Log out
                    </Dropdown.Item>
                </Dropdown>
                <Tooltip content={t('settings.new')}>
                    <Button size="sm" pill={true} onClick={() => { navigate("/new") }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </Button>
                </Tooltip>
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }

}
const mapStateToProps = (state) =>{
    return {
        userAuth: state.Auth,
        user: state.user
    }
}

const mapDispathToProps = (dispatch) =>{
    return{
        logOut: (token) => dispatch({type: "USER_LOGOUT", payload: token}),
        auth : (bool) => dispatch({type: "USER_AUTH", payload: bool})
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Controls)