
import { Tooltip, Button } from "flowbite-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {connect} from 'react-redux'
import Handle from './Handle'
const Todo = (props) => {

    const history = useNavigate()

    /**
     * 
     * @param {*} str string to trim
     * @returns short string less than 50 characters
     */
    const truncate = (str) => {
        return str.length > 50 ? str.substring(0, 50) + "..." : str;
    }


    /**
     * 
     * @param {*} start 
     * @param {*} end 
     */
    const caculateTime = (end) => {
        const today = new Date()
        const endDate = new Date(end)
        const msInHour = 1000 * 60 * 60
        return Math.round(Math.abs(endDate - today) / msInHour)
        
    }

    const goEdit = () =>{
        props.setTemp(props.todo)
        history("/edit")
    }

    const goUpdateStatus = async (stat) =>{
        const changes = {id: props.todo._id, status: "finished"}
        await Handle.updateStatus(changes)
    }

    const { t } = useTranslation()

    //Render status
    let elStatus
    switch (props.todo._status) {
        case "ongoing":
            elStatus = (
                <div className="task__priority flex justify-between p-2 rounded-[50%] bg-emerald-400">
                    <Tooltip content={t("todo.onGoing")}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7">
                            </path>
                        </svg>
                    </Tooltip>
                </div>
            )
            break;
        case "late":
            elStatus = (
                <div className="task__priority flex justify-between p-2 rounded-[50%] bg-red-400">
                    <Tooltip content={t("todo.late")}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </Tooltip>
                </div>
            )
            break
        case "finished":
            elStatus = (
                <div className="task__priority flex justify-between p-2 rounded-[50%] bg-primary-400">
                    <Tooltip content={t("todo.finished")}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path className="stroke-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </Tooltip>
                </div>
            )
            break
        default:
            break;
    }

    return (
        <div className="todo flex gap-10 w-full shadow-lg -shadow-lg rounded-md p-4 justify-between">
            <div className="task__title flex gap-4">

                {elStatus}

                <div className="task__name text-lg font-medium">{props.todo._title}</div>
            </div>
            <div className="task__content flex gap-2 items-center">
                <div className="task__duration-icon">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-emerald-500" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="task__duration-date">{new Date (props.todo._date_start) > new Date()? "---" : caculateTime( props.todo._date_end)} {t("todo.hoursLeft")}</div>
                <div className="task_description-icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-emerald-500" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                        </path>
                    </svg>
                </div>
                <p className="task__description-content text-xs">{truncate(props.todo._content)}</p>
            </div>
            <div className="task__actions flex gap-4">
                <Tooltip content={t("todo.edit")}>
                    <Button size="xs" pill={true} onClick={()=>goEdit()}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </Button>
                </Tooltip>
                {props.todo._status === "ongoing" ?
                    <Tooltip content={t("todo.markDone")}>
                    <Button color="success" size="xs" pill={true} onClick={()=>goUpdateStatus()}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                    </Button>
                </Tooltip>
                :
                <Tooltip content="Restart">
                    <Button color="purple" size="xs" pill={true} onClick={()=>goUpdateStatus()}>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    </Button>
                </Tooltip>
                 }
                
                
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTemp: (todo) => dispatch({ type: "SET_TEMP", payload: todo })
    }
}


export default connect(null, mapDispatchToProps) (Todo)