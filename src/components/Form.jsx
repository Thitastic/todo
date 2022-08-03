import { useTranslation } from 'react-i18next'
import { Label, TextInput, Textarea, Button, Select } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import Handle from './Handle'
const Form = (props) => {

    const { t } = useTranslation()
    const history = useNavigate()


    const getToday = (future) => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        const yyyy = today.getFullYear()
        const h = String(today.getHours() + future).padStart(2, '0')
        const m = String(today.getMinutes()).padStart(2, '0')
        today = yyyy + "-" + mm + "-" + dd + "T" + h + ":" + m
        return today
    }

    const [title, setTitle] = useState(props.todo ? props.todo._title : "")
    const [content, setContent] = useState(props.todo ? props.todo._content : "")
    const [priority, setPriority] = useState(props.todo ? props.todo._priority : 1)
    const [startDate, setStartDate] = useState(props.todo ? props.todo._date_start : getToday(0))
    const [endDate, setEndDate] = useState(props.todo ? props.todo._date_end : getToday(3))
    const [todoId, setTodoId] = useState(props.todo ? props.todo._id : "")
    const [todoStatus, setTodoStatus] = useState(props.todo ? props.todo._status : "ongoing")

    const goUpdate = async () => {
        const todoUpdate = {
            title: title,
            content: content,
            priority: priority,
            startDate: startDate,
            endDate: endDate,
            id: todoId,
            auth: props.auth.username,
            visibility: true,
            finished: false,
            status: todoStatus
        }
        const status = await Handle.updateTodo(todoUpdate)
        if (status.status === 200) {
            history("/dashboard")
        }
    }
    const goDelete = async () => {
        const status = await Handle.removeTodo(todoId)
        if (status.status === 200) {
            history("/dashboard")
        }
    }

    return (
        <div className="todo__form flex justify-center">
            <div className="form__container w-2/3 p-3 flex flex-col gap-4">
                <h1 className="text-2xl font-medium mb-2">{props.todo ? t("form.titleEdit"): t("form.titleNew")}</h1>
                <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="taskTitle"
                                value={t("form.title") + "*"}
                            />
                        </div>
                        <TextInput
                            id="taskTitle"
                            type="text"
                            required={true}
                            defaultValue={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="taskContent"
                                value={t("form.desc") + "*"}
                            />
                        </div>
                        <Textarea
                            id="taskContent"
                            required={true}
                            defaultValue={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                    <div id="prioritySelect">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="taskPriority"
                                value={t("form.priority") + "*"}
                            />
                        </div>
                        <Select
                            id="taskPriority"
                            required={true}
                            defaultValue={priority}
                            onChange={e => setPriority(e.target.value)}
                        >
                            <option value={1}>
                                {t("form.priorityLow") }
                            </option>
                            <option value={2}>
                            {t("form.priorityMedium") }
                            </option>
                            <option value={3}>
                            {t("form.priorityHigh") }
                            </option>
                            <option value={4}>
                            {t("form.priorityImp") }
                            </option>
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="taskContent"
                                value={t("form.duration") + "*"}
                            />

                            <div className="flex items-center">
                                <div className="relative w-1/2">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input name="start" type="datetime-local" defaultValue={startDate} onChange={e => setStartDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Due date" />
                                </div>
                                <span className="mx-4 text-gray-500">&gt;</span>
                                <div className="relative w-1/2">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input name="end" type="datetime-local" defaultValue={endDate} onChange={e => setEndDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="End date" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <Button onClick={() => goUpdate()}>
                        {props.todo ? t("form.save") : t("form.create") }
                    </Button>
                    {
                        props.todo ? <Button color="failure" onClick={() => goDelete()}>{t("form.delete") }</Button> : ""
                    }
                </form>
            </div>
        </div>
    )
}

export default Form