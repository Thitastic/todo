import React from 'react'
import { Button, Navbar, Tooltip } from 'flowbite-react'
import { useTranslation } from 'react-i18next'
import {useNavigate, Link} from 'react-router-dom'

import Settings from './Settings'
import Controls from '../components/Controls'
import { emitter } from './emitter'
import User from '../middleware/users'
const Header = (props) => {

    const showSettings = () => {
        emitter.emit("showSettings")
        console.log(456)
    }


    const { t } = useTranslation()
    const history = useNavigate()
    return (
        <div className="header">
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Link className='flex gap-2' to="/dashboard">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Todo Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        {t('settings.todoList')}
                    </span>
                </Link>
                <div className="md:order-2 flex gap-5">
                    <Controls auth={props.auth} logOut={props.logOut} />
                    <Tooltip content={t('settings.settings')}>
                        <Button pill={true} onClick={() => showSettings()}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </Button>
                    </Tooltip>
                </div>
            </Navbar>
            <Settings />
        </div>
    )

}
export default Header