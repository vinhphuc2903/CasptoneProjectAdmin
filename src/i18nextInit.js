import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationVi from './assets/locales/vi/translation.json';

const i18n = i18next.createInstance();
const fallbackLng = ['vi'];
const availableLanguages = ['vi'];

const resources = {
    vi: {
        translation: translationVi,
    },
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng,

        detection: {
            checkWhitelist: true,
        },

        debug: false,

        whitelist: availableLanguages,

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
