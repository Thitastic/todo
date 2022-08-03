import { Toast, Button } from 'flowbite-react'
import i18n from '../translation/i18n'
const Notice = (props) => {
    const hideToast = props.hideToast
    return (
        <div className={props.visible ? "unset" : "hidden"}>
            <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="mx-3 text-sm font-normal">
                {props.msg}
            </div>
            <Button size="xs" color="failure" onClick={()=>hideToast()}>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </Button>
        </Toast>
        </div>
    )
}
export default Notice