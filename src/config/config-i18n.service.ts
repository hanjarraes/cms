import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Function to determine preferred language
const determineLanguage = () => {
    return 'en'
}

// Set the language before initializing i18next
const preferredLanguage = determineLanguage()

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: preferredLanguage,
        supportedLngs: ['en', 'de', 'es', 'fr', 'id', 'ja', 'pl', 'zh'],
        debug: false,
        fallbackLng: 'en',
        nonExplicitSupportedLngs: true,
    })

export default i18n
