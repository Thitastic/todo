import ctaImg from './empty_workspace.jpg'
import {Button} from 'flowbite-react'
import { useTranslation } from 'react-i18next'
import {Link} from 'react-router-dom'
const Empty = (props) =>{
    const {t} = useTranslation()
    return(
        <div className="empty p-5 flex flex-col gap-5 justify-center items-center">
            <img className='w-1/4' src={ctaImg} alt="empty__workspace" />
            <div className='text-3xl align-center'>{t("emptyCta.title")}</div>
            <p className="text-md">{t("emptyCta.subtitle")}</p>
            <div className="cta-container animate-bounce">
                    <Link to="/new">
                        <Button to={props.link}>{t("emptyCta.create")}</Button>
                    </Link>
            </div>
        </div>
    )
}
export default Empty