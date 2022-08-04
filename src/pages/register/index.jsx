import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button, Label, TextInput, Spinner} from "flowbite-react"
import { Helmet } from "react-helmet"
import Handle from './handle'
import {useState } from "react"
import { sha256 } from 'js-sha256'
import Notice from '../../components/Notice'
import {connect} from 'react-redux'
const Register = (props) => {
    const { t } = useTranslation()


    //Form handle
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [toast, setToast] = useState({msg: "", visible: false})
    const [loader, setLoader] =  useState(false)


    /**
     * 
     * @param {*} msg toast message
     * @param {*} visible toast visibillity
     */
    const newToast = (msg, visible) =>{
        setToast({msg: msg, visible: visible})
    }

    const hideToast = () =>{
        setToast({msg: "", visible: false})
    }
    

    /**
     * Verify username and email exist
     * @returns boolean (@true if username and email are available @false if exist)
     */
    const verifyUser = async  () => {
        setLoader(true)
        const verifyUsername = await Handle.findUsername(username)
        const verifyEmail = await Handle.findEmail(email)
        if(verifyEmail){
            newToast(t("msg.emailExist"), true)
            setLoader(false)
            return false
        }
        if(verifyUsername){
            newToast(t("msg.usernameExist"), true)
            setLoader(false)
            return false
        }
        setLoader(false)
        return true
    }

    /**
     * 
     * @returns boolean
     */
    const verifyPassword = () =>{
        if(!password || !passwordConfirm){
            newToast(t("msg.passwordBlank"), true)
            return false
        }
        if(password !== passwordConfirm){
            newToast(t("msg.passwordNotmatch"), true)
            return false
        }
        return true
    }

    //Register
    const create = async () => {
        const userVerify = await verifyUser()
        const passwordVerify = verifyPassword()
        if (email && username && password && userVerify && passwordVerify) {
            const newUser = { username: username, email: email, password: sha256(password)}
            const user = await Handle.newUser(newUser)
            console.log(user._token)
            if (user) {
                localStorage.setItem("token", user._token)
                props.login({username: user._username, email: user._email})
            }
            else {
                alert("Somethings went wrong :(")
            }
        }
    }


    return (
        <div className="register flex justify-center mt-5">
            <Helmet>
                <title>TODO | {t("documentTitle.register")}</title>
            </Helmet>
            <div className="flex flex-col gap-5 w-[70%] border-primary-500 border-2 border-solid rounded-md p-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t("register.title")}
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
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="name@todo.com"
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="username"
                                value={t("register.username")}
                            />
                        </div>
                        <TextInput
                            id="username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required={true}
                            minLength={6}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value={t("register.password")}
                            />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required={true}
                            minLength={6}
                            maxLength={18}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="passwordConfirm"
                                value={t("register.confirmPassword")}
                            />
                        </div>
                        <TextInput
                            id="passwordConfirm"
                            type="password"
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                            required={true}
                            minLength={6}
                            maxLength={18}
                        />
                    </div>
                    <Button onClick={() => create()}>
                        {loader ? <Spinner size="sm" aria-label="Default status example" /> : t("register.register")}
                    </Button>
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                        {t("register.login")}
                    </Link>
                </form>

            </div>
            <div className="toast fixed bottom-5 left-5">
              <Notice msg={toast.msg} visible={toast.visible} hideToast={hideToast}/>
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

export default connect(mapStateToProps, mapDispatchToProps) (Register)