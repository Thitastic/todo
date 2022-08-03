import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'

import translationVI from '../locales/vi/translation'
import translationEN from '../locales/en/translation'
import translationKR from '../locales/kr/translation'


// the translations
const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    },
    kr:{
        translation: translationKR
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'kr',
        fallbackLng: ['vi', 'en', 'kr'],
        debug: true,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export function changeLanguage(lng){
    return i18n.changeLanguage(lng)
}

export function setDefaultLanguage(){
    return i18n.changeLanguage('en')
}

export default i18n;