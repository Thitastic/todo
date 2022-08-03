import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button, Label, TextInput } from "flowbite-react"
import Handle from './handle'
import { useNavigate } from "react-router-dom"
import { sha256 } from "js-sha256"
import { useEffect, useState } from "react"
import {connect} from 'react-redux'

const Login = (props) => {
    const {t} = useTranslation()

    useEffect(()=>{
        document.title = "TODO | Login"
    })

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    /**
     * 
     */
    const login = async () =>{ 
        if(email && password){
            const verifyUser = {email: email, password: sha256(password)}
            const user = await Handle.login(verifyUser)
            if(user){
                localStorage.setItem("token", user._token)
                props.login({username: user._username, emial: user._email})
            }
        }
    }

    return (
        <div className="login flex justify-center mt-10">
            <div className="flex flex-col gap-5 w-[70%] border-primary-500 border-2 border-solid rounded-md p-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t("login.title")}
                </h5>

                <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value={t("login.yourEmail")}
                            />
                        </div>
                        <TextInput
                            id="email1"
                            type="email"
                            placeholder="name@todo.com"
                            required={true}
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value={t("login.password")}
                            />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            required={true}
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <Button onClick={()=>login()}>
                    {t("login.login")}
                    </Button>
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                        {t("login.register")}
                    </Link>
                </form>

            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        login: (user) => dispatch({type: "USER_LOGIN", payload: user})
    }
}

const mapStateToProps = (state) =>{
    return {
        userAuth : state.Auth,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login)